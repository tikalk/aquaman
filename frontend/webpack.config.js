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
        test: /\.jsx?$/,
        include: resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Swipe It',
    }),
  ],
};
