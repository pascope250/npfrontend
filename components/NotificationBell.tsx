"use client";
import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Close dropdown on click away
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleReadNoti = async(url: string, id: string) => {
    await markAsRead(id);
    router.push(url);

  }

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="rounded-full relative cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <svg
          className={`w-10 h-7 transition-transform duration-300 ${
            unreadCount > 0 ? "animate-bell-ring" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full shadow">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20 border animate-fade-in-up">
          <div className="py-1 max-h-96 overflow-y-auto">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b sticky top-0 bg-white flex items-center justify-between">
              <span>Notifications</span>
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    notifications.forEach((n) => markAsRead(n.id));
                  }}
                  className="ml-2 text-xs text-blue-500 cursor-pointer hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                      !notification.isRead
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={()=> handleReadNoti(notification.url as string,notification.id)}
                  >
                    <div className="font-semibold text-gray-800">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-700 mt-0.5">
                      {notification.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.25s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes bellRing {
          0% {
            transform: rotate(0);
          }
          10% {
            transform: rotate(-15deg);
          }
          20% {
            transform: rotate(10deg);
          }
          30% {
            transform: rotate(-10deg);
          }
          40% {
            transform: rotate(6deg);
          }
          50% {
            transform: rotate(-4deg);
          }
          60% {
            transform: rotate(2deg);
          }
          70% {
            transform: rotate(-1deg);
          }
          80% {
            transform: rotate(1deg);
          }
          90% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(0);
          }
        }
        .animate-bell-ring {
          animation: bellRing 1s;
        }
      `}</style>
    </div>
  );
}
