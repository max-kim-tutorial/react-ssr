import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Helmet from 'react-helmet';

import App from './App';

const app = express();

//! 개발모드일때 웹팩 데브 미들웨어를 같이 실행시킨다
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js');

  // express 서버에서 웹팩 파일 수정될때 서빙을 해줌
  const webpackDevMiddleware = require('webpack-dev-middleware');

  // 데브미들웨어에서 가져온 파일 정보들을 토대로 파일들을 불러와서 브라우저에 갱신
  // 실질적으로 SSR의 HMR을 해줌
  const webpackHotMiddleware = require('webpack-hot-middleware');

  // 얘를 이렇게 실행해주면 컴파일러 파일처럼 사용할 수 있음
  // 신기..
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname)));

app.get('*', (req, res) => {
  const context = {};

  // 앱을 통째로
  // 중간에 브라우저 라우터는?
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );

  const helmet = Helmet.renderStatic(); // renderToString 이후에 가져와야 됨

  res.set('content-type', 'text/html');
  res.send(`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="text/javascript" src="main.js"></script>
        </body>
      </html>
  `);
});

app.listen(3003, () => console.log('Server started http://localhost:3003'));
