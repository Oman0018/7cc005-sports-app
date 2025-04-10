const logger = require('../utils/logger'); // Assuming you're using a logger utility (e.g., winston)

function errorMiddleware(err, req, res, next) {
  // Log the error stack
  logger.error(err.stack); // Log the error stack to a file, or use a logging service

  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is provided
  const message = err.message || 'Internal Server Error'; // Default error message
  
  // Respond with different error formats based on the environment
  if (process.env.NODE_ENV === 'production') {
    // In production, hide stack trace for security reasons
    res.status(statusCode).json({
      success: false,
      message,
    });
  } else {
    // In development, include the stack trace for debugging purposes
    res.status(statusCode).json({
      success: false,
      message,
      stack: err.stack, // Include stack trace only in development
    });
  }
}

module.exports = errorMiddleware;
