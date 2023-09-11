/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.themealdb.com"], // Add the domain(s) from which you are loading images
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
