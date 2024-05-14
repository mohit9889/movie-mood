const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    MOVIE_API_KEY: process.env.MOVIE_API_KEY,
    BASE_URL: process.env.BASE_URL,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};
