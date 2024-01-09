import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./screens/Home'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div style={{ width: '100%', height: 0, paddingBottom: '91%', position: 'relative' }}>
              <iframe src="https://giphy.com/embed/uIJBFZoOaifHf52MER" width="100%" height="100%" style={{ position: 'absolute' }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </div>}>
              <Home />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
