// LiveScores.js
import React, { useEffect, useState } from 'react';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/live-scores') // Example endpoint
      .then(res => res.json())
      .then(data => setLiveMatches(data));
  }, []);

  return (
    <div className="p-4">
      <h2>Live Scores</h2>
      {liveMatches.length === 0 ? <p>No live matches</p> : (
        <ul>
          {liveMatches.map(match => (
            <li key={match.id}>
              {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveScores;
