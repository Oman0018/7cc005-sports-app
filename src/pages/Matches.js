// src/pages/Matches.js
import React, { useState } from 'react';

const Matches = () => {
  const [matches] = useState([
    { id: 1, teams: 'Team A vs Team B', date: '2023-07-01', status: 'Upcoming' },
    { id: 2, teams: 'Team C vs Team D', date: '2023-07-02', status: 'Live' },
    // Add more mock matches here
  ]);

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            <h3>{match.teams}</h3>
            <p>Date: {match.date}</p>
            <p>Status: {match.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
