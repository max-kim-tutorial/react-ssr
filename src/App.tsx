import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Counter from './pages/Counter';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <Helmet>
        <title>App</title>
      </Helmet>
      <h1>
        <a href="/">React App</a>
      </h1>
      <BrowserRouter>
        <div>
          <span>
            <Link to="/counter">카운터</Link>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
