const withGraphql = require('next-plugin-graphql');

/** @type {import('next').NextConfig} */
module.exports = withGraphql({
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  reactStrictMode: true,
});
