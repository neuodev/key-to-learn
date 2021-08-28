module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/backend/:path*", destination: "https://example.com/:path*" },
    ];
  },
};
