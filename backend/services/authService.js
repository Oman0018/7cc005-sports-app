const jwt = require('jsonwebtoken'); // Import the JWT library
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Function to generate a JWT token
function generateAuthToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  };

  // Generate and return the JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
}

// Function to verify a password
function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword); // Returns a promise
}

module.exports = {
  generateAuthToken,
  verifyPassword,
};
