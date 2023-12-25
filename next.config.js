/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL, //???
    ID_USER: process.env.ID_USER
  }
}

module.exports = nextConfig
