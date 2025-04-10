import React, { useEffect, useState } from 'react';
import { fetchFootballMatches } from '../services/fetchLiveData'; // Adjust if your path differs

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchFootballMatches();
        setMatches(data.matches || data.data || []); // Adjust based on API response shape
        setLoading(false);
      } catch (err) {
        console.error('Error loading matches:', err);
        setError('Failed to load live matches');
        setLoading(false);
      }
    };

    loadMatches();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading live matches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Live Matches</h2>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.homeTeam?.name} vs {match.awayTeam?.name} - {match.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveMatches;
