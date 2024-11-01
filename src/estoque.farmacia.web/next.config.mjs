/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   NEXT_PUBLIC_API_URL: 'http://100.28.74.101:5298',
  // },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;