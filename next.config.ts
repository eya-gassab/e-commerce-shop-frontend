import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
<<<<<<< HEAD
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
=======
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // CORS proxy for backend during development
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8097/api/:path*",
    },
  ],
};

<<<<<<< HEAD
export default nextConfig;
=======
export default nextConfig;
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
