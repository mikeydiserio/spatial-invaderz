import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // This will disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
