import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
