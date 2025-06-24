/* @ts-check */
/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: require("./webpack.config"),
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@radix-ui/react-icons", "lucide-react"]
  },
  // Enable compression
  compress: true,
  // Optimize images
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
  // Enable static optimization where possible
  trailingSlash: false,
  poweredByHeader: false
};
module.exports = nextConfig;
