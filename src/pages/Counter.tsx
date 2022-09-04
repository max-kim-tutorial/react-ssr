import { useState } from 'react';
import Helmet from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Counter() {
  const [count, setCount] = useState(0);

  const { data } = useQuery(['grepa'], async () => {
    const {
      data: { name },
    } = await axios.get(
      'https://deelay.me/10000/https://pokeapi.co/api/v2/berry/25/',
    );
    return name;
  });

  const increase = () => {
    setCount((s) => s + 1);
  };

  const decrease = () => {
    setCount((s) => s - 1);
  };

  return (
    <div>
      <Helmet>
        <title>Counter</title>
      </Helmet>
      <h2>Counter</h2>
      <div>{count}</div>
      <div>
        <button onClick={increase}>increase</button>
        <button onClick={decrease}>decrease</button>
        <div>{data}</div>
      </div>
    </div>
  );
}

export default Counter;
