const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  entry: {
    main: './src/index.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],

  devServer: {
    open: true,
    host: 'localhost',
  },
};
