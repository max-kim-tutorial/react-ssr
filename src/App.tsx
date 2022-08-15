import { Routes, Route, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Counter from './pages/Counter';
import Register from './pages/Register';
import RootRouter from './RootRouter';

function App() {
  if (typeof window !== 'undefined') {
    console.log('클라');
  } else {
    console.log('서버');
  }

  return (
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      <h1>
        <a href="/">React App</a>
      </h1>
      <RootRouter>
        <div>
          <span>
            <Link to="/counter">카운터!</Link>
          </span>
          &nbsp; &nbsp;
          <span>
            <Link to="/register">등록</Link>
          </span>
        </div>
        <Routes>
          <Route path="/" element={<div>링크를 클릭해주세요</div>} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </RootRouter>
    </div>
  );
}

export default App;
