"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const GA_MEASUREMENT_ID = "G-1YG5H4WCFY";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(""); // Accepts string or null

  useEffect(() => {
    if (typeof window.gtag !== "function") return;

    if (prevPath.current !== pathname) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
