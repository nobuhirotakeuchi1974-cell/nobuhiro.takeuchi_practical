require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // Reference a variable that was defined in the .env file and make it available at Build Time
        API_ENDPOINT: process.env.API_ENDPOINT,
      },
      experimental: {
        suppressHydrationWarning: true,
      },
      // SSRの問題を軽減
      reactStrictMode: true,
}

module.exports = nextConfig
