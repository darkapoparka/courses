import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingIncludes: {
    "/reference-assets/*": ["./reference/originals/*.webp", "./reference/originals/high-resolution/*.webp"],
  },
};
export default nextConfig;
