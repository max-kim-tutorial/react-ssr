const path = require('path');
const webpack = require('webpack');

const rootPath = path.join(__dirname);

// This connects to the server to receive notifications
// when the bundle rebuilds and then updates your client bundle accordingly.
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

console.log('핫 미들웨어', process.env.NODE_ENV);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [hotMiddlewareScript, './src/index.tsx'],
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js',
    publicPath: '/',
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
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
