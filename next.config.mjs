/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // 🌐 Duniyar jekono website ba URL theke image remote-ly load korar wild-card setup
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // '**' dewar karone jekono domain (img.ibb.co, jekono CDN) allow hoye jabe!
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**', // Standard HTTP link gulo support korar jonno fallback wrapper
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;