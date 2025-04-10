const winston = require('winston'); // Import winston for logging

// Create a custom logger using winston
const logger = winston.createLogger({
  level: 'info', // Default log level is 'info'
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`; // Define log message format
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Log to console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
  ]
});

// Export the logger
module.exports = logger;
