const connection = require('../config/db'); // Import the database connection

// Match model schema
const Match = {
  getAllMatches: (callback) => {
    const query = 'SELECT * FROM matches';
    connection.query(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getMatchById: (id, callback) => {
    const query = 'SELECT * FROM matches WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  createMatch: (match, callback) => {
    const query = 'INSERT INTO matches (home_team, away_team, match_date, home_score, away_score, status) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [match.home_team, match.away_team, match.match_date, match.home_score, match.away_score, match.status], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },

  updateMatch: (id, match, callback) => {
    const query = 'UPDATE matches SET home_team = ?, away_team = ?, match_date = ?, home_score = ?, away_score = ?, status = ? WHERE id = ?';
    connection.query(query, [match.home_team, match.away_team, match.match_date, match.home_score, match.away_score, match.status, id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  deleteMatch: (id, callback) => {
    const query = 'DELETE FROM matches WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = Match;
