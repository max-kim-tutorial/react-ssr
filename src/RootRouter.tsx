import { BrowserRouter } from 'react-router-dom';
import { ReactNode } from 'react';

function RootRouter({ children }: { children: ReactNode }) {
  if (typeof window !== 'undefined') {
    return <BrowserRouter>{children}</BrowserRouter>;
  } else {
    return <>{children}</>;
  }
}

export default RootRouter;
