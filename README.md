# React Pure SSR

쌩 리액트 서버사이드 렌더링 해봅니다.

## Stack

- React 18
- express
- webpack-dev-middleware
- webpack-hot-middleware
- ts-node
- SWC
- Node Writable Stream

## Todo

- [x] Executable prod and dev
- [x] webpack-dev-middleware, webpack-hot-middleware
- [x] Code Splitting -> React 18에서는 loadable component가 필요없는거 같음 Supsense가 SSR을 지원함(개꿀)
- [x] renderToPipeableStream -> 데이터 패칭시에도 suspense가 잘 동작하는지 검증 필요
- [x] Node Stream Streaming SSR Server -> express + stream으로 직접 컨셉 구현해보기
- [ ] Server Component
- [ ] Client Side Fast Refresh
- [ ] Critical CSS

## `renderToPipeableStream`

- 초기에 HTML 렌더링하고, selective hydration이 필요한 곳은 비워둔다
- 밑에 스트리밍되는 HTML과 hydration될 자바스크립트가 그대로 같이 렌더링된다
- 브라우저에서 hydration 되면서 컨텐츠가 제자리를 찾아간다.
- 서버에서 모든 SSR에 필요한 것들이 처리되는 오버헤드를 줄이고, 브라우저에서 데이터 패칭(?맞나), 하이드레이션 이후의 PopIn이 일어난다.
