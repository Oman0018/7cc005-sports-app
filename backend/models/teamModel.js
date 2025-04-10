const connection = require('../config/db'); // Import the database connection

// Team model schema
const Team = {
  getAllTeams: (callback) => {
    const query = 'SELECT * FROM teams';
    connection.query(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getTeamById: (id, callback) => {
    const query = 'SELECT * FROM teams WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  createTeam: (team, callback) => {
    const query = 'INSERT INTO teams (name, full_name, abbreviation, city, conference, division) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [team.name, team.full_name, team.abbreviation, team.city, team.conference, team.division], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },

  updateTeam: (id, team, callback) => {
    const query = 'UPDATE teams SET name = ?, full_name = ?, abbreviation = ?, city = ?, conference = ?, division = ? WHERE id = ?';
    connection.query(query, [team.name, team.full_name, team.abbreviation, team.city, team.conference, team.division, id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  deleteTeam: (id, callback) => {
    const query = 'DELETE FROM teams WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = Team;
