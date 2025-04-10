// src/components/LiveUpdates/LiveUpdates.js
import React, { useEffect, useState } from 'react';
import { fetchFootballMatches } from '../../services/fetchLiveData';

const LiveUpdates = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const result = await fetchFootballMatches();
      setMatches(result);
      setLoading(false);
    } catch (err) {
      setError('Failed to load live updates');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
    const interval = setInterval(loadMatches, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <p>Loading live updates...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Live Football Matches</h2>
        <button
          onClick={loadMatches}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Now
        </button>
      </div>

      {matches.length === 0 ? (
        <p className="text-gray-500">No live matches right now.</p>
      ) : (
        <ul className="space-y-3">
          {matches.map((match) => (
            <li
              key={match.id}
              className="p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <div className="text-lg font-semibold">
                {match.home_team?.name} vs {match.away_team?.name}
              </div>
              <div className="text-sm text-gray-600">
                Status: {match.status?.toUpperCase()}
              </div>
              {match.starting_at?.date_time && (
                <div className="text-sm text-gray-500">
                  Kickoff: {formatTime(match.starting_at.date_time)}
                </div>
              )}
              {match.scores && (
                <div className="text-md font-bold mt-1 text-green-600">
                  Score: {match.scores.local_score} - {match.scores.visitor_score}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveUpdates;
