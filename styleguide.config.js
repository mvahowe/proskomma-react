const path = require('path');

module.exports = {
  moduleAliases: { 'proskomma-react': path.resolve(__dirname, 'src') },
  skipComponentsWithoutExample: true,
  ignore: ['**/helpers**', '**/styled**', '**/__tests__/**', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}', '**/*.d.ts'],
  serverPort: 6012,
  exampleMode: 'expand',
  usageMode: 'expand',
  webpackConfig: {
    //https://github.com/facebook/create-react-app/pull/8079#issuecomment-562373869
    devServer: { port: 6012, transportMode: 'ws' },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader' },
          ],
        },
      ],
    },
  },
};
