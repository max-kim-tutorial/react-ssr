const path = require('path');
const nodeExternals = require('webpack-node-externals');

const rootPath = path.join(__dirname);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node', // 얘는 노드에서 돌아가는 서버 코드
  node: false, // node의 규칙을 따르지 않는다. 특히 __dirname
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  entry: {
    server: './src/server.tsx',
  },
  output: {
    path: path.resolve(rootPath, './dist'), // 클라이언트와 똑같이 서버도
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: path.resolve(__dirname, '../.yarn'),
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
