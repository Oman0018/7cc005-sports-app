// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Players from './pages/Players';
import Matches from './pages/Matches';
import Favorites from './pages/Favorites';
import Navigation from './components/Navigation';
import AppProvider from './contexts/AppContext';
import Test from './pages/Test';

function App() {
  return (
    <AppProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </AppProvider> 
   
  );
}

export default App;
