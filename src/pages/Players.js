// src/pages/Players.js
import React, { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const Players = () => {
  const { state, setState } = useContext(AppContext);

  useEffect(() => {
    fetch('https://api.example.com/players') // Replace with a real API
      .then(response => response.json())
      .then(data => setState({ ...state, players: data }))
      .catch(error => console.error('Error fetching players:', error));
  }, [setState]);

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {state.players.map(player => (
          <li key={player.id}>
            <h3>{player.name}</h3>
            <p>{player.stats}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;