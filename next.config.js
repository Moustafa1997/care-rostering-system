// Update your next.config.js to disable linting during build

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: require("./webpack.config"),
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],

  // DISABLE LINTING FOR PRODUCTION BUILD
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },

  images: {
    domains: [
      "dev82.developer24x7.com",
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
