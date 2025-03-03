const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
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
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
