import path from 'path';
import express from 'express';
import React from 'react';
import fs from 'fs';
import axios from 'axios';
import Stream from 'stream';

import App from './App';

const app = express();

const bigFilePath = path.resolve(__dirname, '../public/big.file');

// stream: 비동기 요청이 시작될 때 두번째 스트림을 블락한 후, 특정 요청이 완료되면 재개(Streaming SSR)
app.get('/ssr/stream', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  const fileData = await fs.promises.readFile(bigFilePath);
  res.write(`1-${fileData}\n\n`);

  const {
    data: { name },
  } = await axios.get(
    'https://deelay.me/10000/https://pokeapi.co/api/v2/berry/25/',
  );
  res.write(`2-${name}\n\n`);

  res.end();
});

// non-stream: 비동기 요청과 file read까지 모든 것이 완성되어야 응답 리턴(기존 SSR)
app.get('/ssr/response', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const fileData = await fs.promises.readFile(bigFilePath);

  const {
    data: { name },
  } = await axios.get(
    'https://deelay.me/10000/https://pokeapi.co/api/v2/berry/25/',
  );

  res.end(`1-${fileData}\n\n2-${name}\n\n`);
});

app.listen(3004, () => console.log('Server started http://localhost:3004'));
