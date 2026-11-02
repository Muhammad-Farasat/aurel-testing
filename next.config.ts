import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app is almost entirely per-user/dynamic (auth, dashboards,
  // live pricing), so we opt out of the experimental cache-components
  // model rather than fight its static/dynamic boundaries everywhere.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
