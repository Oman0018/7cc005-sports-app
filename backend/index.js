// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const teamService = require('./services/teamService');
require('dotenv').config();
const teamRoutes = require('./routes/teamRoutes');

// Initialize the express app
const app = express();  // THIS WAS MISSING

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Add a route to the root URL for confirmation
app.get('/', (req, res) => {
  res.send('Welcome to the Sports API!'); // Root route to confirm server is running
});

// Add your routes after initializing the app
app.use(teamRoutes);

// Route to fetch EPL teams from Football Data API and store in MySQL
app.get('/api/matches', async (req, res) => {
  try {
    console.log('Fetching matches...');
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.API_KEY,  // Get API_KEY from environment variable
      },
    });

    if (response.status !== 200) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const matches = response.data.matches;  // Extract matches data from the response
    console.log(`Fetched ${matches.length} matches`);

    // Send the fetched matches data back as a response
    res.json(matches);

  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches', details: error.message });
  }
});

// Route to fetch EPL teams from Football Data API and store in MySQL
app.get('/api/teams', async (req, res) => {
  try {
    console.log('Fetching teams...');
    const response = await axios.get('http://api.football-data.org/v4/competitions/PL/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY,  // Get API_KEY from environment variable
      },
    });

    if (response.status !== 200) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const teams = response.data.teams;  // Extract matches data from the response
    console.log(`Fetched ${teams.length} matches`);

    // Send the fetched matches data back as a response
    res.json(teams);

  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches', details: error.message });
  }
});

// Route to fetch detailed player info by ID
app.get('/api/player/:id', async (req, res) => {
  const playerId = req.params.id;

  try {
    console.log(`Fetching player with ID: ${playerId}`);

    const response = await axios.get(`https://api.football-data.org/v4/players/${playerId}`, {
      headers: {
        'X-Auth-Token': process.env.API_KEY
      }
    });

    if (response.status !== 200) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching player:', error.message);
    res.status(500).json({ error: 'Failed to fetch player', details: error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




