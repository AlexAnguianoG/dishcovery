import type { NextConfig } from "next";

// Extract hostname from STRAPI_BASE_URL if it's set
const getStrapiHostname = (): string | null => {
  const strapiBaseUrl = process.env.STRAPI_BASE_URL;
  if (!strapiBaseUrl) return null;

  try {
    const url = new URL(strapiBaseUrl);
    return url.hostname;
  } catch {
    return null;
  }
};

const strapiHostname = getStrapiHostname();

const remotePatterns: Array<{ protocol: "https" | "http"; hostname: string }> =
  [
    {
      protocol: "https",
      hostname: "*.media.strapiapp.com",
    },
  ];

// Add STRAPI_BASE_URL hostname if it's set and different from Strapi Cloud
if (strapiHostname && !strapiHostname.includes("strapiapp.com")) {
  remotePatterns.push({
    protocol: strapiHostname.startsWith("localhost") ? "http" : "https",
    hostname: strapiHostname,
  });
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
