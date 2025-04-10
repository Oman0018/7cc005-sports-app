// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Sports Stats Hub goes to landing page */}
      <NavLink className="navbar-brand" to="/">Sports Stats Hub</NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          {/* Home goes to /home now */}
          <li className="nav-item">
            <NavLink
              to="/home"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/players"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Players
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/matches"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Matches
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/favorites"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Favorites
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/player-stats"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Player Stats
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/team-stats"
              className={({ isActive }) => isActive ? 'nav-link font-bold' : 'nav-link'}
            >
              Team Stats
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
