const mysql = require('mysql2'); // Import mysql2 package

// MySQL connection setup
const connection = mysql.createConnection({
  host: 'localhost',         // Use 'localhost' or '127.0.0.1' for local MySQL
  user: 'root',              // MySQL username (default is 'root' for many installations)
  password: '',              // MySQL password (leave empty if no password is set)
  database: 'sports_statistics_hub', // Database name
  port: 3307,                // Change the port to 3307 as set in XAMPP
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err); // Log the error if connection fails
    return;
  }
  console.log('Connected to the database'); // Log success message if connected
});

module.exports = connection; // Export the connection object
