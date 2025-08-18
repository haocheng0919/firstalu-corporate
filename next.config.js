/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now stable in Next.js 14
  
  // Ignore problematic folders with Chinese characters during build
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/public/纸盒编辑文件/**',
        '**/public/刀叉图上传/**',
        '**/public/Sugarcane Bagasse 上传/**'
      ]
    };
    return config;
  },
  
  // Additional configuration to handle static file serving
  async rewrites() {
    return [];
  }
}

module.exports = nextConfig;