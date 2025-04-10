import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Players from './pages/Players';
import Matches from './pages/Matches';
import Favorites from './pages/Favorites';
import Test from './pages/Test';
import PlayerStats from './pages/PlayerStats'; // ✅ KEEP only one
import TeamStats from './pages/TeamStats';

import Navigation from './components/Navigation';
import Header from './components/Header';
import AppProvider from './contexts/AppContext';


function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/player-stats" element={<PlayerStats />} /> {/* ✅ This is your player stats page */}
          <Route path="/player/:id" element={<PlayerStats />} /> {/* Optional: single player detail */}
          <Route path="/team-stats" element={<TeamStats />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
