/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now stable in Next.js 14
  
  // Additional configuration to handle static file serving
  async rewrites() {
    return [];
  },
  
  // Exclude large/static public directories from output file tracing to avoid micromatch recursion on some environments
  outputFileTracingExcludes: {
    '/**/*': ['./public/cutlery-images/**/*']
  }
}

module.exports = nextConfig;