import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MatchCard from './MatchCard'; // Ensure path is correct

const Home = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/matches');
        setMatches(res.data);
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Match Results</h2>
      {matches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default Home;
