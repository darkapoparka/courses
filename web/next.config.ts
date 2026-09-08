import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Keep development and tracing inside this app, not the reference archive.
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),
  devIndicators: false,
};

export default nextConfig;
