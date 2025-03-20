import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/book",
        permanent: false, 
      },
    ];
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
