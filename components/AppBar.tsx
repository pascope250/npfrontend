// components/AppBar.tsx
'use client';

import NotificationBell from "@/components/NotificationBell";
import NotificationOverlay from "@/components/NotificationToggle";
import { registerServiceWorker } from '@/lib/sw-register';
import { useEffect, useState } from "react";

export default function AppBar() {
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    const register = async () => {
      if (typeof window !== 'undefined') {
        const registration = await registerServiceWorker();
        setSwRegistered(!!registration);
        
        // Optional: Listen for updates
        if (registration) {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed') {
                  console.log('New service worker installed');
                }
              });
            }
          });
        }
      }
    };

    // Only register after window load
    window.addEventListener('load', register);
    
    return () => {
      window.removeEventListener('load', register);
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 p-4 z-50 flex gap-2">
      <NotificationOverlay />
      <NotificationBell />
      {/* Optional: Show registration status */}
      <div className="text-xs">{swRegistered ? 'SW ✅' : 'SW ❌'}</div>
    </div>
  );
}