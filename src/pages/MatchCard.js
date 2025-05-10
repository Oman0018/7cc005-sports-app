//src/pages/MatchCard.js
import React from 'react';
import './MatchCard.css';

const MatchCard = ({ match }) => {
  return (
    <div className="match-card">
      <div className="teams">
        <div className="team">
          <img src={`http://localhost:5000/uploads/${match.TeamOneLogo}`} alt={match.TeamOneName} />
          <span>{match.TeamOneName}</span>
        </div>
        
        <div className="score">
          <strong>{match.TeamOneScore} - {match.TeamTwoScore}</strong>
        </div>
        
        <div className="team">
          <img src={`http://localhost:5000/uploads/${match.TeamTwoLogo}`} alt={match.TeamTwoName} />
          <span>{match.TeamTwoName}</span>
        </div>
      </div>

      <div className="details">
        <span className="date">{new Date(match.DateOfMatch).toLocaleDateString()}</span>
        <span className="competition">{match.Competition}</span>
      </div>
    </div>
  );
};

export default MatchCard;
