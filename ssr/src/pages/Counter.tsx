import { useState } from 'react';
import Helmet from 'react-helmet';

function Counter() {
  const [count, setCount] = useState(0);

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
      </div>
    </div>
  );
}

export default Counter;
