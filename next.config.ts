import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.VERCEL ? "/_zones/pe84" : undefined,
};

export default nextConfig;
