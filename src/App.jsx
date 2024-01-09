import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from "./assets/images/loading.gif";
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          index
          element={
              <Home />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
