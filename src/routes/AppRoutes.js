import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Matches from '../pages/Matches';
import Favorites from '../pages/Favorites';
import PlayerStats from '../pages/PlayerStats';
import TeamStats from '../pages/TeamStats';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/player-stats" element={<PlayerStats />} />
      <Route path="/team-stats" element={<TeamStats />} />
    </Routes>
  );
};

export default AppRoutes;
