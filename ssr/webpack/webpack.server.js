const path = require('path');
const nodeExternals = require('webpack-node-externals');

const rootPath = path.join(__dirname, '..');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node', // 얘는 노드에서 돌아가는 서버 코드
  node: false, // node의 규칙을 따르지 않는다. 특히 __dirname
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
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  //! 서버의 번들 파일에서 불필요한 node_modules를 제외한다.
  externals: [nodeExternals()],
  // SSR은 js파일이 클라이언트에 전송되어 실행되기 전까지, 초기화면의 html string만 렌더링해 먼저 보여주므로
  // 서버에서 렌더링된 파일에는 node_modules가 포함될 필요는 없다 === 서버의 번들 결과물이 node_modules를 모두 가질 필요는 없다
  // 오........... 먼가 새로운 개념인골
};
