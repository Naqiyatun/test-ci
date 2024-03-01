/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  env: {
    origin_path: "https://perintis.palembang.go.id",
    base_url: "https://perintis.palembang.go.id/api",
    base_token: "403f48e620f83d8787a792badb698bf3ba2b78329cd4ff5188fd4880f9d66000d9d5aea60ef5c6f49fa0e3a08db58793bdf02fea48dee193141c4dc60d8a61e9aaaefac1f7dbe530b3a9cd16296cff7bb20c0bae3b716acb3db14cfceb8110056811f144f5638727ff1f3bc4d281f0ad7b889f87588c818b04136ae3ac4338a8"
  },
}

module.exports = nextConfig
