/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'export',
    basePath: '/adovo-fe', // Use the repository name
    images: {
        unoptimized: true, // Since GitHub Pages doesn't support Next.js Image Optimization
    },
};

module.exports = nextConfig
