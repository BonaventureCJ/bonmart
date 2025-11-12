import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // recommended for Next.js projects

  // Webpack configuration to add path alias
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },

  // Keep your existing experimental Turbopack SVG loader
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js', // Treat output as a JS module/component
        },
      },
    },
  },
};

export default nextConfig;
