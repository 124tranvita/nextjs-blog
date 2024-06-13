/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", //https://nextjs.org/docs/app/api-reference/next-config-js/serverActions#bodysizelimit
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
