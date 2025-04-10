//src/pages/Landing.js
// src/pages/Landing.js
import React from 'react';
import '../styles/Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-banner">
      <h1>Welcome to <span>Sports Stats Hub</span></h1>
      <p>Your gateway to all your favourite player & team insights.</p>
      <Link to="/home" className="landing-btn">Explore Now</Link>
    </div>
  );
};

export default Landing;
