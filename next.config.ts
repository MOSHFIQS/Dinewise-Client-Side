import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     images: {
          remotePatterns: [
               {
                    protocol: "https",
                    hostname: "res.cloudinary.com",
               },
               {
                    protocol: "https",
                    hostname: "ui-avatars.com",
               },
               {
                    protocol: "https",
                    hostname: "i.ibb.co",
               },
          ],
     },
     reactStrictMode: true,
     experimental: {
          serverActions: {
               bodySizeLimit: "10mb",
          },
     },
};

export default nextConfig;
