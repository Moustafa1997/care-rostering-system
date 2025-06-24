/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: require("./webpack.config"),
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],

  // Disable linting and TypeScript errors
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },

  // Remove problematic experimental features
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"]
  },

  compress: true,

  images: {
    domains: [
      "dev82.developer24x7.com",
      "images.remotePatterns",
      "localhost",
      "cnp2211.s3.us-east-1.amazonaws.com",
      "example.com"
    ],
    formats: ["image/webp", "image/avif"]
  },

  trailingSlash: false,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/login",
        destination: "/login/manager",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
