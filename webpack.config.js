const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@gorhom/bottom-sheet']
      }
    },
    argv
  );

  // Ensure images are handled properly
  config.module.rules.push({
    test: /\.(jpg|jpeg|png|gif|svg)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/images/',
      },
    },
  });

  return config;
};
