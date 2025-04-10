import React from 'react';
import '../styles/Home.css'; // Correct relative path

const Home = () => {
  return (
    <div>
      <div className="hero-banner">
        <div className="hero-banner-text">Sports Stats Hub</div>
      </div>
      <div className="p-4">
        <p>Your one-stop destination for comprehensive sports statistics and analysis.</p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>📊 Detailed player statistics</li>
          <li>📅 Upcoming match schedules</li>
          <li>⚽ Live match updates</li>
          <li>⭐ Favorites to track your favorite players and teams</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
