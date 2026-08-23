import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Outputs static HTML/CSS/JS to an 'out' folder
  images: { unoptimized: true },
};

export default nextConfig;
