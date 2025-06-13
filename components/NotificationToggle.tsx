"use client";
import { useState, useEffect } from "react";
import {
  isNotificationSupported,
  requestNotificationPermission,
  registerPushNotifications,
  unsubscribeFromNotifications,
} from "@/lib/notifications";

export default function NotificationOverlay() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isNotificationSupported()) {
        setIsSupported(false);
        setShowOverlay(false);
        return;
      }

      // Hide overlay if permission is already granted
      if (typeof window !== "undefined" && Notification.permission === "granted") {
        setShowOverlay(false);
        localStorage.setItem("hasSeenNotificationOverlay", "true");
        setIsSubscribed(true);
        return;
      } else {
        setShowOverlay(true);
        localStorage.removeItem("hasSeenNotificationOverlay");
        setIsSubscribed(false);
      }

      try {
        const registration = await navigator.serviceWorker?.ready;
        const subscription = await registration?.pushManager.getSubscription();
        const subscribed = !!subscription;
        setIsSubscribed(subscribed);

        const hasSeenOverlay = localStorage.getItem("hasSeenNotificationOverlay");
        setShowOverlay(!subscribed && !hasSeenOverlay);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, []);

  const handleToggle = async () => {
    if (!isSupported) return;
    setIsLoading(true);

    try {
      if (isSubscribed) {
        const success = await unsubscribeFromNotifications();
        setIsSubscribed(!success);
        // If unsubscribed, show overlay again unless user closed it before
        if (!success) {
          const hasSeenOverlay = localStorage.getItem("hasSeenNotificationOverlay");
          setShowOverlay(!hasSeenOverlay);
        }
      } else {
        const granted = await requestNotificationPermission();
        
        if (granted) {
          const subscription = await registerPushNotifications();
          const success = !!subscription;
          setIsSubscribed(success);
          if (success) {
            setShowOverlay(false);
            localStorage.setItem("hasSeenNotificationOverlay", "true");
          }
        }
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowOverlay(false);
    localStorage.setItem("hasSeenNotificationOverlay", "true");
  };

  if (!isSupported) {
    return (
      <div className="p-2 text-sm text-yellow-700 bg-yellow-100 rounded">
        Notifications not supported in your browser
      </div>
    );
  }

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-800/60 via-gray-700/40 to-gray-900/60 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeInUp">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4 animate-bounce-slow">
                <svg
                  className="w-10 h-10 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Stay Updated!
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Get notified about new movies, videos, and quotes by enabling
                push notifications.
                <br />
                <span className="text-xs text-gray-400">
                  You can turn this off anytime.
                </span>
              </p>
              <div className="flex flex-col space-y-3 w-full">
                <button
                  onClick={async () => {
                    await handleToggle();
                    handleClose();
                  }}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Enable Notifications"
                  )}
                </button>
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="text-gray-600 hover:text-blue-600 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
          {/* Animation keyframes */}
          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            }
            @keyframes bounce-slow {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
            }
            .animate-bounce-slow {
              animation: bounce-slow 1.8s infinite;
            }
          `}</style>
        </div>
      )}
    </>
  );
}