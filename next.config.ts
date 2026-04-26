import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // CORS proxy for backend during development
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8097/api/:path*",
    },
  ],
};

export default nextConfig;