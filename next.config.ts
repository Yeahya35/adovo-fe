/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true, // Since GitHub Pages doesn't support Next.js Image Optimization
    },
};

module.exports = nextConfig
