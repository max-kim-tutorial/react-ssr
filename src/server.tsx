import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Helmet from 'react-helmet';
import { Writable } from 'node:stream';

import App from './App';

const app = express();

//! 개발모드일때 웹팩 데브 미들웨어를 같이 실행시킨다
if (process.env.NODE_ENV !== 'production') {
  console.log('개발모드');

  const webpack = require('webpack');
  const webpackConfig = require('../webpack.client.js');

  // dev-server 확장판
  // 웹팩으로 빌드한 정적 파일을 처리해줌
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

// The front part of the HTML. it'll be streamed before the ReactDOMServer render result.
const frontHTML = (title?: string, headAppend?: string) => `
<!DOCTYPE HTML>
  <html>
    <head>
      ${headAppend ?? ''}
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, user-scalable=no">
      <meta name="google" content="notranslate">
    </head>
    <body>
      <div id="root">`;

const backHTML = `</div>
    </body>
  </html>`;

app.get('*', (req, res) => {
  // 앱을 통째로
  // 중간에 브라우저 라우터는? -> 앱단에서 분기해주자
  const stream = new Writable({
    write(chunk, _encoding, cb) {
      res.write(chunk, cb);
    },
    final() {
      res.end(backHTML);
    },
  });

  let wasError = false;
  // renderToString 이후에 가져와야 됨

  const { pipe, abort } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: ['main.js'],
      onShellReady() {
        res.statusCode = wasError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        res.write(frontHTML());
        pipe(stream);
      },
      onAllReady() {
        console.log('all ready');
      },
      onError(x) {
        wasError = true;
        console.error(x);
      },
    },
  );

  // renderToString
  // const html = renderToString(
  //   <StaticRouter location={req.url}>
  //     <App />
  //   </StaticRouter>,
  // );

  // const helmet = Helmet.renderStatic(); // renderToString 이후에 가져와야 됨

  // res.set('content-type', 'text/html');
  // res.send(`
  //   <!DOCTYPE html>
  //     <html lang="en">
  //       <head>
  //         <meta charset="utf-8">
  //         <meta name="viewport" content="width=device-width, user-scalable=no">
  //         <meta name="google" content="notranslate">
  //         ${helmet.title.toString()}
  //       </head>
  //       <body>
  //         <div id="root">${html}</div>
  //         <script type="text/javascript" src="main.js"></script>
  //       </body>
  //     </html>
  // `);
});

app.listen(3003, () => console.log('Server started http://localhost:3003'));
