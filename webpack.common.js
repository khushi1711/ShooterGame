const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        type: 'asset/resource',
      },
    ],
  },
};
