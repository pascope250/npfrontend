// // components/Footer.tsx
// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="col-span-1">
//             <h3 className="text-xl font-bold mb-4">HobbyVb</h3>
//             <p className="text-gray-400">
//               Your one-stop destination for all hobby-related content.
//             </p>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
//               <li><Link href="/videos" className="text-gray-400 hover:text-white transition">Videos</Link></li>
//               <li><Link href="/movies" className="text-gray-400 hover:text-white transition">Movies</Link></li>
//               <li><Link href="/quotes" className="text-gray-400 hover:text-white transition">Quotes</Link></li>
//               <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Legal</h4>
//             <ul className="space-y-2">
//               <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
//               <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
//               <li><Link href="/dmca" className="text-gray-400 hover:text-white transition">DMCA</Link></li>
//               <li><Link href="/dmca" className="text-gray-400 hover:text-white transition">Copyright</Link></li>
//             </ul>
//           </div>
          
//           <div>
//             <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-2">
//               <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Form</Link></li>
//               <li><a href="mailto:myhobbies250@gmail.com" className="text-gray-400 hover:text-white transition">Email Us</a></li>
//               <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
//           <p>© {new Date().getFullYear()} HobbyVb. All rights reserved.</p>
//           <p className="text-sm mt-2">
//             Disclaimer: We do not host any content on our servers. All content is provided by third-party services.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }


// components/Footer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";
import Link from "next/link";
import { 
  FaHome, 
  FaFilm, 
  FaVideo, 
  FaQuoteRight, 
  FaBell,
  FaEnvelope,
  FaShieldAlt,
  FaCopyright,
  FaQuestionCircle
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Desktop Footer - shown on md screens and larger */}
      <footer className="hidden md:block bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">HobbyVb</h3>
              <p className="text-gray-400">
                Your one-stop destination for all hobby-related content.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaHome size={14} /> Home</Link></li>
                <li><Link href="/videos" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaVideo size={14} /> Videos</Link></li>
                <li><Link href="/movies" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaFilm size={14} /> Movies</Link></li>
                <li><Link href="/quotes" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaQuoteRight size={14} /> Quotes</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition flex items-center gap-2">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaShieldAlt size={14} /> Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/dmca" className="text-gray-400 hover:text-white transition">DMCA</Link></li>
                <li><Link href="/dmca" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaCopyright size={14} /> Copyright</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact Form</Link></li>
                <li><a href="mailto:myhobbies250@gmail.com" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaEnvelope size={14} /> Email Us</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white transition flex items-center gap-2"><FaQuestionCircle size={14} /> FAQ</a></li>
              </ul>
              
              {/* Notification Bell for Desktop */}
              {/* <div className="mt-4">
                <NotificationBell />
              </div> */}
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} HobbyVb. All rights reserved.</p>
            <p className="text-sm mt-2">
              Disclaimer: We do not host any content on our servers. All content is provided by third-party services.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation - shown on screens smaller than md */}
      <MobileNavigation />
      
      {/* Spacer to prevent content from being hidden behind the fixed mobile nav */}
      <div className="md:hidden pb-16"></div>
    </>
  );
}

function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-gray-800 text-white border-t border-gray-700 z-50">
      <div className="flex justify-around items-center py-3">
        <Link href="/" className="flex flex-col items-center text-xs p-2 hover:text-blue-300 transition">
          <FaHome size={20} />
          <span className="mt-1">Home</span>
        </Link>
        <Link href="/movies" className="flex flex-col items-center text-xs p-2 hover:text-blue-300 transition">
          <FaFilm size={20} />
          <span className="mt-1">Movies</span>
        </Link>
        <Link href="/videos" className="flex flex-col items-center text-xs p-2 hover:text-blue-300 transition">
          <FaVideo size={20} />
          <span className="mt-1">Videos</span>
        </Link>
        <Link href="/quotes" className="flex flex-col items-center text-xs p-2 hover:text-blue-300 transition">
          <FaQuoteRight size={20} />
          <span className="mt-1">Quotes</span>
        </Link>
        <MobileNotificationBell />
      </div>
    </nav>
  );
}

function MobileNotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex flex-col items-center text-xs p-2 hover:text-blue-300 transition"
        aria-label="Notifications"
      >
        <div className="relative">
          <FaBell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full shadow">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="mt-1">Alerts</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-2 left-2 mx-auto w-auto bg-white rounded-md shadow-lg overflow-hidden z-20 border animate-fade-in-up">
          <div className="py-1 max-h-60 overflow-y-auto">
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
                <Link href={notification.url || "#"} key={notification.id}>
                  <div
                    className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                      !notification.isRead
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(notification.id)}
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
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="rounded-full relative cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <div className={`w-10 h-7 flex items-center justify-center transition-transform duration-300 ${
          unreadCount > 0 ? "animate-bell-ring" : ""
        }`}>
          <FaBell size={20} />
        </div>
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
                <Link href={notification.url || "#"} key={notification.id}>
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b cursor-pointer transition-colors ${
                      !notification.isRead
                        ? "bg-blue-50 hover:bg-blue-100"
                        : "bg-white hover:bg-gray-50"
                    }`}
                    onClick={() => markAsRead(notification.id)}
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
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}