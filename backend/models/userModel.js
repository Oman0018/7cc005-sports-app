const connection = require('../config/db'); // Import the database connection
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating JWT tokens

// User model schema
const User = {
  // Register a new user
  registerUser: (userData, callback) => {
    // Hash the password before storing it
    bcrypt.hash(userData.password, 10, (err, hashedPassword) => {
      if (err) {
        callback(err, null);
      } else {
        const query = 'INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [userData.username, userData.email, hashedPassword, userData.first_name, userData.last_name, userData.role], (err, results) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results.insertId);
          }
        });
      }
    });
  },

  // Find a user by username (for login)
  getUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]); // Return the first result
      }
    });
  },

  // Validate user login (by comparing password)
  validateUserPassword: (password, hashedPassword, callback) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, isMatch); // Return true or false if passwords match
      }
    });
  },

  // Generate JWT token for user authentication
  generateAuthToken: (user) => {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
    return token;
  },

  // Get user by ID
  getUserById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]); // Return the user
      }
    });
  },

  // Update user profile
  updateUser: (id, updatedData, callback) => {
    const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?';
    connection.query(query, [updatedData.first_name, updatedData.last_name, updatedData.email, updatedData.role, id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Delete a user
  deleteUser: (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = User;
