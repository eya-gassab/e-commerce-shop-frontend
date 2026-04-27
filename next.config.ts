import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8097/api/:path*",
    },
  ],
};

export default nextConfig;
