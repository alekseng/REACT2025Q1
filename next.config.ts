import { webpack } from 'next/dist/compiled/webpack/webpack';
/** @type {import('next').NextConfig} */

const nextConfig = {
  distDir: './dist',

  webpack(config: webpack.Configuration) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
