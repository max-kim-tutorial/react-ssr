import { hydrateRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

hydrateRoot(container, <App />); // SSR에서 초기 마크업을 받고 render가 아니라 hydrate만 한다.

// render는 React Element를 렌더링
// hydrate는 React Element를 렌더링하지 않고 이벤트 핸들러 등록 등의 hydration만 수행
