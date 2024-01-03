import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./screens/Home'));

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
