// // lib/notifications.ts
// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

import { registerServiceWorker } from "./sw-register";

// export function isNotificationSupported() {
//   return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
// }

// export async function requestNotificationPermission(): Promise<boolean> {
//   if (!isNotificationSupported()) return false;
  
//   const permission = await Notification.requestPermission();
//   return permission === 'granted';
// }

// export async function registerPushNotifications(): Promise<boolean> {
//   if (!isNotificationSupported()) return false;


  
  
//   try {
       
//     const registration = await navigator.serviceWorker.ready;
     
//     const subscription = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
//     });
    
  

//     // Send subscription to backend
//     const response = await fetch(`${BACKEND_URL}/notifications/subscribe`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         endpoint: subscription.endpoint,
//         keys: {
//           p256dh: subscription.toJSON().keys?.p256dh,
//           auth: subscription.toJSON().keys?.auth
//         },
//         browserId: localStorage.getItem('browserId') || 
//                    crypto.randomUUID() // Generate a unique browser ID
//       })
//     });

//     if (!response.ok) throw new Error('Failed to register with backend');
    
//     return true;
//   } catch (error) {
//     console.error('Push registration error:', error);
//     return false;
//   }
// }

// export async function unsubscribeFromNotifications(): Promise<boolean> {
//   if (!isNotificationSupported()) return false;
  
//   try {
//     const registration = await navigator.serviceWorker.ready;
//     const subscription = await registration.pushManager.getSubscription();
    
//     if (subscription) {
//       // Notify backend about unsubscribe
//       await fetch(`${BACKEND_URL}/notifications/unsubscribe`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           endpoint: subscription.endpoint
//         })
//       });
      
//       // Unsubscribe locally
//       await subscription.unsubscribe();
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error('Unsubscribe error:', error);
//     return false;
//   }
// }




// lib/notifications.ts
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://hobby.nepoba.com';

export function isNotificationSupported() {
  return typeof window !== 'undefined' && 
         'Notification' in window && 
         'serviceWorker' in navigator && 
         'PushManager' in window;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function registerPushNotifications(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
     // Ensure service worker is registered
    let registration: ServiceWorkerRegistration | null | undefined = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      registration = await registerServiceWorker();
      if (!registration) {
        throw new Error('Failed to register service worker');
      }
      // Wait for the service worker to be ready
      registration = await navigator.serviceWorker.ready;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    });
    // Send subscription to backend
    const response = await fetch(`${BACKEND_URL}/api/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys?.p256dh,
          auth: subscription.toJSON().keys?.auth
        },
        browserId: localStorage.getItem('browserId') || 
                  crypto.randomUUID()
      })
    });

    if (!response.ok) {
      throw new Error(`Backend registration failed: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Push registration error:', error);
    return false;
  }
}

export async function unsubscribeFromNotifications(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      // Notify backend about unsubscribe
      const response = await fetch(`${BACKEND_URL}/notifications/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: subscription.endpoint
        })
      });

      if (!response.ok) {
        throw new Error(`Backend unsubscribe failed: ${response.status}`);
      }
      
      // Unsubscribe locally
      await subscription.unsubscribe();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return false;
  }
}

export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      console.warn('No active subscription found');
      return false;
    }

    const browserId = localStorage.getItem('browserId');
    if (!browserId) {
      console.warn('No browserId found in localStorage');
      return false;
    }

    const response = await fetch(`${BACKEND_URL}/api/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.toJSON().keys?.p256dh,
          auth: subscription.toJSON().keys?.auth
        },
        browserId
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Mark as read error:', error);
    return false;
  }
}

export async function getBrowserId(): Promise<string> {
  let browserId = localStorage.getItem('browserId');
  if (!browserId) {
    browserId = crypto.randomUUID();
    localStorage.setItem('browserId', browserId);
  }
  return browserId;
}