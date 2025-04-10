const jwt = require('jsonwebtoken'); // For verifying JWT tokens

// Middleware to check if the user is authenticated
function authMiddleware(req, res, next) {
  const token = req.header('Authorization'); // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = authMiddleware;
