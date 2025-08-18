/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now stable in Next.js 14
  
  // Additional configuration to handle static file serving
  async rewrites() {
    return [];
  }
}

module.exports = nextConfig;