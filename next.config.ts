// next.config.ts

import { withSentryConfig } from "@sentry/nextjs";
import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define interface to avoid 'any' linting error
interface WebpackRule {
  test?: { test: (path: string) => boolean };
  exclude?: RegExp;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack: (config) => {
    // 🔥 1. Find existing SVG rule with proper typing
    const fileLoaderRule = config.module.rules.find((rule: WebpackRule) =>
      rule.test?.test?.(".svg")
    ) as WebpackRule | undefined;

    // 🔥 2. Exclude SVG from default Next.js handling
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 🔥 3. Add SVGR loader
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Path alias
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: "bonmart",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  automaticVercelMonitors: true,
  disableLogger: true,
});
