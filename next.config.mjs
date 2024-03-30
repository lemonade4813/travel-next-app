// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// const path = require('path'); // 1. path 선언

import path from 'path'; 

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')], // 2. sassOptions 옵션 추가
  },
};

module.exports = nextConfig;