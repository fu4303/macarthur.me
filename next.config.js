const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages, {
  }]
], {
  async redirects() {
    return [
      {
        source: '/posts/page/1',
        destination: '/posts',
        permanent: true,
      },
    ]
  },
});
