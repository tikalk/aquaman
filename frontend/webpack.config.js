const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: {
    app: ['./'],
  },

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },

  context: resolve(__dirname, 'src'),

  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Aquaman',
    }),
  ],
};
