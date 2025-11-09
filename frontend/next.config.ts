import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
