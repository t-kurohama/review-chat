import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'img.rakuten.co.jp',
      },
      {
        protocol: 'https',
        hostname: 'shopping.c.yimg.jp',
      },
      {
        protocol: 'https',
        hostname: 'image.yodobashi.com',
      },
    ],
  },
};

export default nextConfig;
