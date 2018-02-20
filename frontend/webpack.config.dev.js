const { resolve } = require('path');
const merge = require('webpack-merge');
const autoPrefixer = require('autoprefixer');
const simpleVars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const config = require('./webpack.config');

module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include: resolve(__dirname, 'src'),
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [
                  autoPrefixer,
                  simpleVars,
                  nested
                ];
              },
            },
          },
        ],
      },
    ],
  },
});
