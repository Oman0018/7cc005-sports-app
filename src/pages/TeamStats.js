import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeamStats() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [favoriteTeams, setFavoriteTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teams');
                setTeams(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load team stats.');
                setLoading(false);
            }
        };

        const storedFavorites = JSON.parse(localStorage.getItem('favoriteTeams')) || [];
        setFavoriteTeams(storedFavorites);

        fetchTeams();
    }, []);

    const toggleTeam = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isFavorite = (teamId) => {
        return favoriteTeams.some(team => team.id === teamId);
    };

    const toggleFavorite = (team) => {
        let updatedFavorites;

        if (isFavorite(team.id)) {
            updatedFavorites = favoriteTeams.filter(t => t.id !== team.id);
        } else {
            updatedFavorites = [...favoriteTeams, team];
        }

        setFavoriteTeams(updatedFavorites);
        localStorage.setItem('favoriteTeams', JSON.stringify(updatedFavorites));
    };

    if (loading) return <div className="p-6">Loading team stats...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Team Statistics</h1>

            {teams.map(team => (
                <div key={team.id} className="mb-4 border rounded shadow">
                    {/* Accordion Header */}
                    <div
                        className="flex justify-between items-center px-4 py-3 bg-gray-100 cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleTeam(team.id)}
                    >
                        <div className="flex items-center space-x-3">
                            <img src={team.crest} alt={team.name} className="w-6 h-6" />
                            <h2 className="text-lg font-semibold">{team.name}</h2>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent expanding
                                    toggleFavorite(team);
                                }}
                                className="text-2xl"
                            >
                                {isFavorite(team.id) ? '❤️' : '🤍'}
                            </button>
                            <span>{expanded[team.id] ? '▲' : '▼'}</span>
                        </div>
                    </div>

                    {/* Expanded Details */}
                    {expanded[team.id] && (
                        <div className="bg-white px-4 py-3">
                            <p className="text-sm text-gray-700">
                                <strong>Venue:</strong> {team.venue}
                            </p>
                            {team.coach && (
                                <p className="text-sm text-gray-700">
                                    <strong>Coach:</strong> {team.coach.name}
                                </p>
                            )}
                            {team.address && (
                                <p className="text-sm text-gray-500">
                                    <strong>Address:</strong> {team.address}
                                </p>
                            )}
                            {team.website && (
                                <p className="text-sm text-blue-600">
                                    <strong>Website:</strong>{' '}
                                    <a href={team.website} target="_blank" rel="noopener noreferrer">
                                        {team.website}
                                    </a>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TeamStats;
