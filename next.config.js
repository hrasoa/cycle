/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack: (config, options) => {
    // console.log(config.resolve);
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: [options.dir],
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
    });
    config.resolve.extensions.push('.graphql');
    return config;
  },
};
