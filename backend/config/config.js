//backend/config/config.js (General App Configuration)
//This file contains general configurations like API keys and other settings.
const connection = require('./config/db'); // Database connection

// Example function to store teams in the database
async function storeTeamsInDatabase(teams) {
  teams.forEach((team) => {
    const query = 'INSERT INTO teams (name, full_name, abbreviation, city, conference, division) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [team.name, team.name, team.shortName, team.venue.city, 'EPL', 'Premier League'], (err, results) => {
      if (err) {
        console.error('Error inserting team:', err);
      } else {
        console.log('Inserted team:', results.insertId);
      }
    });
  });
}

// Example of using this function after fetching EPL data
app.get('/api/epl-teams', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PL/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY,
      },
    });

    const teams = response.data.teams; // Assuming the response has a 'teams' field
    storeTeamsInDatabase(teams); // Store teams in the database
    res.json(teams); // Send data back to the client
  } catch (error) {
    console.error('Error fetching EPL teams:', error.message);
    res.status(500).json({ error: 'Failed to fetch EPL teams' });
  }
});
