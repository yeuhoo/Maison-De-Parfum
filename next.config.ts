import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async headers() {
    // Allow Square Web Payments SDK to load in production (Vercel).
    // If you set a stricter CSP elsewhere (e.g. Vercel dashboard), this ensures
    // squarecdn scripts/frames/fonts are permitted.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      // Next.js uses inline scripts for hydration; keep unsafe-inline unless you
      // migrate to nonces/hashes across the app.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      "style-src 'self' 'unsafe-inline'",
      // Square loads an external stylesheet (card-wrapper.css) via <link>.
      "style-src-elem 'self' 'unsafe-inline' https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      "frame-src 'self' https://sandbox.web.squarecdn.com https://web.squarecdn.com",
      // Square sandbox calls PCI connect and telemetry endpoints.
      "connect-src 'self' https://sandbox.web.squarecdn.com https://web.squarecdn.com https://pci-connect.squareupsandbox.com https://*.squareupsandbox.com https://*.squareup.com https://*.squarecdn.com https://*.square.com https://*.sentry.io",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
