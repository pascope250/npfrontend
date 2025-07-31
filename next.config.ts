import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hobbyvb.com',
      },
      {
        protocol: 'https',
        hostname: 'hobby.nepoba.com',
      },
      {
        protocol: 'https',
        hostname: '*.hobbyvb.com',
      },
      {
        protocol: 'https',
        hostname: '*.hobby.nepoba.com',
      },
      {
        protocol: 'https',
        hostname: 'hobby-api.hdev.rw',
      },
      {
        protocol: 'https',
        hostname: 'quote-generator-api-six.vercel.app', // Removed https:// prefix
      },
      {
        // for local host
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    dangerouslyAllowSVG: false,
  },
  staticPageGenerationTimeout: 30000,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Add specific headers for service worker
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          },
          {
            key: 'Content-Type',
            value: 'application/javascript'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ]
      }
    ];
  },
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;