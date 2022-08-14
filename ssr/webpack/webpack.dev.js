const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const rootPath = path.join(__dirname, '..');

module.exports = {
  mode: 'development',
  entry: path.join(rootPath, 'src/index.tsx'),
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    static: {
      directory: path.join(rootPath, 'dist'),
      publicPath: '/',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(rootPath, 'public/index.html'),
    }),
  ],
};
