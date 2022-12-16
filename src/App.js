import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from './components/Nav';
import { ScrollToTop } from './functions/ScrollToTop';
import { AnimatedRoutes } from './components/AnimatedRoutes';

function App() {
  return (
      <BrowserRouter>
        <ScrollToTop />
        <Nav>
          <AnimatedRoutes />
        </Nav>
      </BrowserRouter>
  );
}

export default App;
