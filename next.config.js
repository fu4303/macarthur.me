const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const withPreact = require('next-plugin-preact');

module.exports = withPlugins(
  [
    [optimizedImages, {}],
    [withPreact, {}]
  ]);
