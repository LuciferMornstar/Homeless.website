/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'lucifer',
  output: 'export', // Static export configuration
  images: {
    domains: ['localhost', 'homeless.website'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homeless.website',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Required for static export
  },
  // Removed redirects as they don't work with static exports
};

module.exports = nextConfig;