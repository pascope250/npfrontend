import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { MovieProvider } from "@/context/movieContext";
import { VideoProvider } from "@/context/youtubeContext";
import { QuoteProvider } from "@/context/quoteContext";
import { NotificationProvider } from "@/context/NotificationContext";
import Script from "next/script";
import React from "react";
import DisableRightClick from "@/components/DisableRightClick";
import Footer from "@/components/Footer";
import { ContactProvider } from "@/context/contactContext";
import AppBar from "@/components/AppBar";
export const metadata: Metadata = {
  title: {
    default: "HobbyVb - Movies, Videos & Inspirational Quotes",
    template: "%s | HobbyVb",
  },
  description:
    "Discover the best collection of movies, entertaining videos, and inspirational quotes. Your daily dose of entertainment and motivation.",
  keywords: ["movies", "videos", "quotes", "entertainment", "motivation"],
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://hobbyvb.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HobbyVb - Your Entertainment Hub",
    description:
      "Explore movies, videos, and quotes that inspire and entertain",
    url: "https://hobbyvb.com",
    siteName: "HobbyVb",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HobbyVb - Movies, Videos & Quotes Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HobbyVb - Movies, Videos & Quotes",
    description: "Your daily entertainment and inspiration source",
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HobbyVb",
  url: "https://hobbyvb.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hobbyvb.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-1YG5H4WCFY"
        />
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1YG5H4WCFY', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ✅ Google AdSense Script */}
        <Script
          id="adsbygoogle-js"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2590844740735026"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-2590844740735026",
        enable_page_level_ads: true
      });
    `,
          }}
        /> */}

        <Script
          id="disable-context-menu"
          dangerouslySetInnerHTML={{
            __html: `
              // Right-click prevention
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
              
              // DevTools detection
              (function() {
                var devtools = {
                  open: false,
                  orientation: null
                };
                var threshold = 160;
                var emitEvent = function(state, orientation) {
                  if (state) {
                    window.location.href = "about:blank"; // Close the tab
                  }
                };
                
                // Method 2: Check debugger function
                var checkDebugger = function() {
                  var startTime = new Date().getTime();
                  debugger;
                  var endTime = new Date().getTime();
                  if (endTime - startTime > 100) {
                    devtools.open = true;
                    emitEvent(true, null);
                  }
                };
                
            })();

            // ✅ Disable DevTools shortcuts
      document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') {
          e.preventDefault();
        }

        // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U / Ctrl+S or Cmd+S
        if (
          (e.ctrlKey || e.metaKey) &&
          (e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (!e.shiftKey && (e.key === 'U' || e.key === 'S'))
        ) {
          e.preventDefault();
        }
      });
            `,
          }}
        />
      </head>

      <body className={`antialiased`}>
        <ContactProvider>
          <VideoProvider>
            <MovieProvider>
              <NotificationProvider>
                <QuoteProvider>
                  {children}
                  <GoogleAnalytics />
                  <AppBar />
                  <DisableRightClick />
                  <Footer />
                </QuoteProvider>
              </NotificationProvider>
            </MovieProvider>
          </VideoProvider>
        </ContactProvider>
      </body>
    </html>
  );
}
