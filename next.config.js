/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'homeless.website'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homeless.website',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/help',
        destination: '/get-help',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;