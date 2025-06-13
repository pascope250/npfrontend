'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMovieContext } from '@/context/movieContext';
import { markNotificationAsRead, getBrowserId } from '@/lib/notifications';

type Notification = {
  id: string;
  title: string;
  url?: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  syncNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hobby.nepoba.com';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useMovieContext();

  const loadNotifications = async () => {
    try {
      const browserId = await getBrowserId();
      
      // Get server notifications
      const serverRes = await fetch(`${BACKEND_API_URL}/api/notifications/get?browserId=${browserId}`);
      if (!serverRes.ok) throw new Error('Failed to fetch server notifications');
      const serverData = await serverRes.json();
      // Get cached notifications from service worker if available
      let cachedData: any[] = [];
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          cachedData = await new Promise(resolve => {
            const channel = new MessageChannel();
            channel.port1.onmessage = (event) => {
              if (event.data.type === 'CACHED_NOTIFICATIONS_RESPONSE') {
                resolve(event.data.notifications || []);
              }
            };
            registration.active?.postMessage(
              { type: 'GET_CACHED_NOTIFICATIONS' },
              [channel.port2]
            );
            // Add timeout in case service worker doesn't respond
            setTimeout(() => resolve([]), 1000);
          });
        } catch (swError) {
          console.error('Service worker error:', swError);
        }
      }

            

      // Merge and deduplicate notifications
      const allNotifications = [...serverData, ...cachedData].reduce((acc, current) => {
        const exists = acc.some((item: Notification) => item.id === current.id);
        if (!exists) {
          acc.push({
            id: current.id?.toString() || Date.now().toString(),
            title: current.title || 'Notification',
            message: current.message || '',
            url: current.url,
            timestamp: current.created_at 
              ? new Date(current.created_at) 
              : current.timestamp 
                ? new Date(current.timestamp)
                : new Date(),
            isRead: current.isRead || false
          });
        }
        
        return acc;

      }, [] as Notification[]);



      // Sort by timestamp (newest first)
      allNotifications.sort((a: Notification, b: Notification) => b.timestamp.getTime() - a.timestamp.getTime());
      
      setNotifications(allNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleNewNotification = (data: { 
    id?: string | number; 
    title?: string; 
    message?: string;
    url?: string;
    created_at?: string;
  }) => {
    const newNotification: Notification = {
      id: data.id?.toString() || Date.now().toString(),
      title: data.title || 'New Notification',
      message: data.message || 'You have a new notification',
      url: data.url,
      timestamp: data.created_at ? new Date(data.created_at) : new Date(),
      isRead: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show browser notification if permission is granted
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      new Notification(newNotification.title, {
        body: newNotification.message,
        data: { url: newNotification.url }
      });
    }
  };

  useEffect(() => {
    loadNotifications();

    if (socket) {
      socket.on('new-notification', handleNewNotification);
      socket.on('notification-read', (data: { id: string }) => {
        setNotifications(prev =>
          prev.map(n => n.id === data.id.toString() ? { ...n, isRead: true } : n)
        );
      });
    }

    // Handle service worker messages
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data.type === 'NEW_PUSH_NOTIFICATION') {
        handleNewNotification(event.data.notification);
      }
    };

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }

    return () => {
      if (socket) {
        socket.off('new-notification', handleNewNotification);
        socket.off('notification-read');
      }
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, [socket]);


  // In your NotificationProvider component
useEffect(() => {
  const initializeNotifications = async () => {
    await loadNotifications();
    
    // Check for pending notifications from service worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const pendingNotifications = await new Promise<Notification[]>(resolve => {
          const channel = new MessageChannel();
          channel.port1.onmessage = (event) => {
            if (event.data.type === 'PENDING_NOTIFICATIONS') {
              resolve(event.data.notifications.map((n: any) => ({
                id: n.id,
                title: n.title,
                message: n.message,
                url: n.url,
                timestamp: new Date(n.timestamp),
                isRead: false
              })));
            }
          };
          registration.active?.postMessage(
            { type: 'GET_PENDING_NOTIFICATIONS' },
            [channel.port2]
          );
          setTimeout(() => resolve([]), 1000);
        });

        if (pendingNotifications.length > 0) {
          setNotifications(prev => [...pendingNotifications, ...prev]);
        }
      } catch (error) {
        console.error('Error checking pending notifications:', error);
      }
    }
  };

  initializeNotifications();
}, [socket]);

  const markAsRead = async (id: string) => {
    const originalState = notifications;
    // Optimistic update
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );

    try {
      const success = await markNotificationAsRead(id);
      if (!success) throw new Error('Failed to mark as read');

      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.active?.postMessage({
          type: 'MARK_NOTIFICATION_READ',
          id
        });
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setNotifications(originalState);
    }
  };

  const clearAll = async () => {
    try {
      await fetch(`${BACKEND_API_URL}/api/notifications/clear`, {
        method: 'POST'
      });
      
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.active?.postMessage({ 
          type: 'CLEAR_ALL_NOTIFICATIONS' 
        });
      }
      
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const syncNotifications = async () => {
    await loadNotifications();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      clearAll,
      syncNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};