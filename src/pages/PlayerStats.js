import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlayerStats() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/players/stats')
            .then(response => {
                console.log('✅ Fetched playerstats:', response.data); // DEBUG
                setPlayers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('❌ Failed to fetch player stats:', error);
                setError('Unable to load player stats.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="p-6">Loading player stats...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Top Player Stats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map(player => (
                    <div key={player.id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
                        <div className="flex items-center space-x-4 mb-4">
                            <img src={player.image} alt={player.name} className="w-16 h-16 rounded-full" />
                            <div>
                                <h2 className="text-xl font-semibold">{player.name}</h2>
                                <p className="text-sm text-gray-500">{player.team}</p>
                                <p className="text-sm">{player.position}</p>
                            </div>
                        </div>
                        <div className="text-sm text-gray-700">
                            <p>Appearances: {player.appearances}</p>
                            <p>Goals: {player.goals}</p>
                            <p>Assists: {player.assists}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlayerStats;
