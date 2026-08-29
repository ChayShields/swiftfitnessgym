/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
