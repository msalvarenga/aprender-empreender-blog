/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'http',  hostname: 'localhost' },
    ],
  },
}
module.exports = nextConfig
