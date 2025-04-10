const connection = require('../config/db'); // Import the database connection

// Player model schema
const Player = {
  getAllPlayers: (callback) => {
    const query = 'SELECT * FROM players';
    connection.query(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getPlayerById: (id, callback) => {
    const query = 'SELECT * FROM players WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  createPlayer: (player, callback) => {
    const query = 'INSERT INTO players (first_name, last_name, team_id, position, height, weight, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [player.first_name, player.last_name, player.team_id, player.position, player.height, player.weight, player.birthdate], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.insertId);
      }
    });
  },

  updatePlayer: (id, player, callback) => {
    const query = 'UPDATE players SET first_name = ?, last_name = ?, team_id = ?, position = ?, height = ?, weight = ?, birthdate = ? WHERE id = ?';
    connection.query(query, [player.first_name, player.last_name, player.team_id, player.position, player.height, player.weight, player.birthdate, id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  deletePlayer: (id, callback) => {
    const query = 'DELETE FROM players WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = Player;
