/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imgur.com", "i.imgur.com"],
    loader: "akamai",
    path: "",
  }
}

module.exports = nextConfig
