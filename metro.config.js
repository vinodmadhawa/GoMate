const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for image file extensions
config.resolver.assetExts.push(
  'jpg',
  'jpeg',
  'png',
  'gif',
  'svg'
);

module.exports = config;
