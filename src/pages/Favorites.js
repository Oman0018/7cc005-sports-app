// src/pages/Favorites.js
import React, { useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, name: 'Favorite Player 1' },
    { id: 2, name: 'Favorite Player 2' },
    // Add more mock favorites here
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map(favorite => (
          <li key={favorite.id}>
            <h3>{favorite.name}</h3>
            <button onClick={() => removeFavorite(favorite.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites
