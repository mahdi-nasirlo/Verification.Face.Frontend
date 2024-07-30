/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vface.ir",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
