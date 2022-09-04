import path from 'path';
import express from 'express';
import axios from 'axios';

const app = express();

const bigFilePath = path.resolve(__dirname, '../public/big.file');

// Default SSR: 모든 비동기 요청이 끝나야 응답 리턴 (all-or-nothing, waterfall)
app.get('/ssr/default', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const {
    data: { name },
  } = await axios.get(
    'https://deelay.me/3000/https://pokeapi.co/api/v2/berry/30/',
  );

  res.end(`
    <div id="content">
      <h1>Default SSR</h1>
      <div>non-data fetching UI</div>
      <div>data fetching UI with response: ${name}</div>
    </div>  
  `);
});

// Streaming SSR: fallback UI가 담긴 HTML을 스트림 쓰기 이후, 특정 요청이 완료되면 pop-in
app.get('/ssr/stream', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write(`
    <div id="content">
      <h1>Streaming SSR</h1>
      <div>non-data fetching UI</div>
      <div id="fallback">...loading</div>  
    </div>
  `);

  const {
    data: { name },
  } = await axios.get(
    'https://deelay.me/3000/https://pokeapi.co/api/v2/berry/25/',
  );

  res.write(`
    <div hidden id="pop-in">data fetching UI with response: ${name}</div>
    <script>
      const popInHtml = document.getElementById('pop-in');
      const fallback = document.getElementById('fallback');

      popInHtml.parentNode.removeChild(popInHtml)

      const fallbackParentNode = fallback.parentNode;
      fallbackParentNode.removeChild(fallback);

      popInHtml.removeAttribute('hidden');
      fallbackParentNode.appendChild(popInHtml);
    </script>
  `);

  res.end();
});

app.listen(3004, () => console.log('Server started http://localhost:3004'));
