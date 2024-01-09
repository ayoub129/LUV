import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from "assets/images/loading.gif";
const Home = lazy(() => import('./screens/Home'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: 'black' }}>
                <img src={Loading} alt="loading" />
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
