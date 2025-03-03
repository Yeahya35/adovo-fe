/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: { ignoreDuringBuilds: true },
    output: "export",
    basePath: "/adovo-fe",
    assetPrefix: "/adovo-fe",
    images: { unoptimized: true },
    trailingSlash: true,
};

module.exports = nextConfig;
