/* @ts-check */
/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: require("./webpack.config"),
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],
  
  // Netlify-specific configurations
  target: process.env.NETLIFY ? "serverless" : "server",
  
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
    formats: ["image/webp", "image/avif"],
    // For static export on Netlify
    unoptimized: process.env.NETLIFY ? true : false
  },
  
  // Enable static optimization where possible
  trailingSlash: false,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
  
  // Netlify redirects (handled in netlify.toml but can be supplemented here)
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/login/manager',
        permanent: true,
      },
    ];
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;