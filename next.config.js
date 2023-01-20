/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**.supabase.so",
        pathname: "/storage/v1/object/public/profiles/**",
      },
    ],
  },
};

module.exports = nextConfig;
