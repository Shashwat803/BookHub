import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bookhub-q388.onrender.com",
        port: "",
        pathname: "/uploads/**", // Allow all images in the /uploads directory
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // Adjust the port if necessary
        pathname: "/**", // Allow all images from localhost
      },
    ],
  },
};

export default nextConfig;