import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'lucide-react'],
  },
  images: {
    formats: ['image/webp'],
  },
};

export default nextConfig;
