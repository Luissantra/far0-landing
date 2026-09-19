import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  agentRules: false,
  async redirects() {
    return [{ source: "/landing", destination: "/", permanent: true }];
  },
};

export default nextConfig;
