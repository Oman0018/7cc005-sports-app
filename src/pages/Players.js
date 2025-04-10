import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Players() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [expandedTeams, setExpandedTeams] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teams');
                setTeams(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load players.');
                setLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    const toggleFavorite = (player) => {
        const saved = JSON.parse(localStorage.getItem('favoritePlayers')) || [];
        const exists = saved.find(p => p.id === player.id);
      
        const updated = exists
          ? saved.filter(p => p.id !== player.id)
          : [...saved, player];
      
        localStorage.setItem('favoritePlayers', JSON.stringify(updated));
      };
      

    /*const toggleFavorite = (player) => {
        const exists = favorites.find(p => p.id === player.id);
        const updated = exists
            ? favorites.filter(p => p.id !== player.id)
            : [...favorites, player];

        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };*/

    const toggleTeam = (teamId) => {
        setExpandedTeams(prev => ({
            ...prev,
            [teamId]: !prev[teamId],
        }));
    };

    if (loading) return <div className="p-6">Loading players...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Premier League Players</h1>

            {teams.map(team => (
                <div key={team.id} className="mb-6 border rounded shadow">
                    {/* Team Header */}
                    <div
                        className="flex items-center justify-between bg-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleTeam(team.id)}
                    >
                        <div className="flex items-center space-x-3">
                            <img src={team.crest} alt={team.name} className="w-6 h-6" />
                            <h2 className="text-lg font-semibold">{team.name}</h2>
                        </div>
                        <span>{expandedTeams[team.id] ? '▲' : '▼'}</span>
                    </div>

                    {/* Players List */}
                    {expandedTeams[team.id] && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                            {team.squad.map(player => (
                                <div
                                    key={player.id}
                                    className="relative border rounded-lg p-3 shadow hover:shadow-md transition cursor-pointer"
                                    onClick={() => navigate(`/player/${player.id}`, { state: { player } })}
                                >
                                    <h3 className="font-semibold mb-1">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position}</p>
                                    <p className="text-xs text-gray-500">{player.nationality}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(player);
                                        }}
                                        className="absolute top-2 right-2 text-lg"
                                    >
                                        {favorites.some(p => p.id === player.id) ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Players;
