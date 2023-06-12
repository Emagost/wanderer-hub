/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
];
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
