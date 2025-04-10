import React, { useEffect, useState } from 'react';

const MatchResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/match-results') // Your backend route
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(error => console.error("Error fetching match results:", error));
  }, []);

  return (
    <div className="p-4">
      <h2>Match Results</h2>
      {results.length === 0 ? (
        <p>No recent match results available.</p>
      ) : (
        <ul>
          {results.map((match, index) => (
            <li key={index}>
              {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchResults;
