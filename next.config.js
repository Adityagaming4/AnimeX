/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.noitatnemucod.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'megaplay.buzz',
        port: '',
        pathname: '/**',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/watch/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;