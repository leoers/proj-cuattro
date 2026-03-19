import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cuattro.live',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;