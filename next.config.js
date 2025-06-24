/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: require("./webpack.config"),
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],

  // Keep the linting disabled
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },

  // REMOVE the experimental optimizeCss that's causing the critters error
  experimental: {
    // optimizeCss: true,  // <-- REMOVED THIS LINE
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
  poweredByHeader: false,

  // Simple redirect
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
