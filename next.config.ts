import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

export default nextConfig;
