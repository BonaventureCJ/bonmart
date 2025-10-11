import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Add the following configuration block:
  experimental: {
    turbo: {
      rules: {
        // This rule tells Turbopack to use @svgr/webpack for all .svg files
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js', // Treats the output as a JS module/component
        },
      },
    },
  },
};

export default nextConfig;
