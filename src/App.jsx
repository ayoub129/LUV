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
            <Suspense fallback={<div style="width:100%;height:0;padding-bottom:91%;position:relative;"><iframe src="https://giphy.com/embed/uIJBFZoOaifHf52MER" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/UniversalMusicIndia-elvish-dg-immortals-bawli-uIJBFZoOaifHf52MER">via GIPHY</a></p>}>
              <Home />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

