/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/adovo-fe',
  assetPrefix: '/adovo-fe',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  trailingSlash: true,
};

module.exports = nextConfig;
