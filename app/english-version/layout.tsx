import type { Metadata } from "next";
import "../globals.css";
import React from "react";
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



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    

      <body className={`antialiased`}>
                  {children}
                 
      </body>
    </html>
  );
}
