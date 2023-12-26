/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL, //???
    ID_USER: 1
  }
}

module.exports = nextConfig
