import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Players from './pages/Players';
import Matches from './pages/Matches';
import Favorites from './pages/Favorites';
import Test from './pages/Test';
import PlayerStats from './pages/PlayerStats'; // KEEP only one
import TeamStats from './pages/TeamStats';

import Navigation from './components/Navigation';
import Header from './components/Header';
import AppProvider from './contexts/AppContext';

import AdminCreate from './admin/create'; // This is the create page for admin
import AdminDashboard from './admin/adminDashBoard';
import ListTeam from './admin/ListTeam';
import DashboardOverview from './admin/DashboardOverview'; // This is the overview page for admin
import EditMatch from './admin/EditMatch'; // This is the edit match page for admin 

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
       {/*  <Navigation /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/player-stats" element={<PlayerStats />} /> {/* This is your player stats page */}
          <Route path="/player/:id" element={<PlayerStats />} /> {/* Optional: single player detail */}
          <Route path="/team-stats" element={<TeamStats />} />
          <Route path="/test" element={<Test />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DashboardOverview />} />  {/* index = /admin */}
            <Route path="create" element={<AdminCreate />} />
            <Route path="list" element={<ListTeam />} />
            <Route path="/admin/EditMatch/:id" element={<EditMatch />} />
          </Route>
        </Routes>

        
      </Router>
    </AppProvider>
  );
}

export default App;
