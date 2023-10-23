/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '127.0.0.1',
      'localhost',
      'api.cshare.lol',
      'avatars.githubusercontent.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chats',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
