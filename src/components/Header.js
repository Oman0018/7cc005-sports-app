// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserFriends, FaCalendarAlt, FaStar, FaChartBar } from 'react-icons/fa';

import '../styles/Navigation.css';

const Header = () => {
  return (
    <header className="navbar">
      <div className="brand">
        <FaChartBar className="logo-icon" />
        <span>Sports Stats Hub</span>
      </div>
      <nav className="nav-links">
        <NavLink to="/" end>
          <FaHome /> <span>Home</span>
        </NavLink>
        <NavLink to="/players">
          <FaUserFriends /> <span>Players</span>
        </NavLink>
        <NavLink to="/matches">
          <FaCalendarAlt /> <span>Matches</span>
        </NavLink>
        <NavLink to="/favorites">
          <FaStar /> <span>Favorites</span>
        </NavLink>
        <NavLink to="/player-stats">
          <FaChartBar /> <span>Player Stats</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
