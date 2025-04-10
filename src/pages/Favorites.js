import React, { useEffect, useState } from 'react';

function Favorites() {
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [favoriteTeams, setFavoriteTeams] = useState([]);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem('favoritePlayers')) || [];
    const teams = JSON.parse(localStorage.getItem('favoriteTeams')) || [];
    setFavoritePlayers(players);
    setFavoriteTeams(teams);
  }, []); // <- runs once on component mount

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Favorite Players</h1>
      {favoritePlayers.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        favoritePlayers.map(player => (
          <div key={player.id} className="border p-4 rounded mb-2">
            <h2 className="text-xl font-semibold">{player.name}</h2>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Nationality:</strong> {player.nationality}</p>
          </div>
        ))
      )}

      <h2 className="text-3xl font-bold mt-8 mb-4">My Favorite Teams</h2>
      {favoriteTeams.length === 0 ? (
        <p>You haven't added any team favorites yet.</p>
      ) : (
        favoriteTeams.map(team => (
          <div key={team.id} className="border p-4 rounded mb-2">
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p><strong>Stadium:</strong> {team.venue}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
