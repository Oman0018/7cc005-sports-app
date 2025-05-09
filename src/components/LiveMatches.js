// src/components/LiveMatches.js
import React, { useEffect, useState } from 'react';
import { fetchFootballMatches } from '../services/fetchLiveData';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchFootballMatches();
        console.log('Fetched live matches:', data); // 🔍 Debugging
        setMatches(data.matches || data);  // ✅ Using 'matches' array or root if needed
        setLoading(false);
      } catch (err) {
        console.error('Error loading matches:', err);
        setError('Failed to load live matches');
        setLoading(false);
      }
    };

    loadMatches();

    const interval = setInterval(loadMatches, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading live matches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Matches</h2>
      {matches.length === 0 ? (
        <p>No live matches at the moment.</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((match) => (
            <li
              key={match.id}
              className="p-3 border rounded shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="text-lg font-semibold">
                {match.homeTeam?.name} vs {match.awayTeam?.name}
              </div>
              <div className="text-sm text-gray-600">
                Status: {match.status}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveMatches;
