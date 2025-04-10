const axios = require('axios');
const matchService = require('../services/matchService'); // Assuming we have a service to handle database interaction

// Fetch EPL matches from Football Data API
exports.getEplMatches = async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PL/matches', {
      headers: { 'X-Auth-Token': process.env.API_KEY }, // API key from .env
    });

    const matches = response.data.matches; // Extract match data from response

    // Store matches data in the database
    await matchService.storeMatchesInDatabase(matches); // Assuming matchService handles database operations

    // Send matches data back to the client
    res.json(matches); 
  } catch (error) {
    console.error('Error fetching EPL matches:', error.message);
    res.status(500).json({ message: 'Failed to fetch EPL matches', error: error.message });
  }
};


const axios = require('axios');
const matchService = require('../services/matchService');

// Fetch matches from multiple competitions (EPL, La Liga, CL)
exports.getAllMatches = async (req, res) => {
  try {
    const leagues = ['PL', 'PD', 'CL']; // Premier League, La Liga, Champions League
    let allMatches = [];

    for (const code of leagues) {
      const response = await axios.get(`https://api.football-data.org/v2/competitions/${code}/matches`, {
        headers: {
          'X-Auth-Token': process.env.API_KEY,
        },
      });

      const matches = response.data.matches;

      // Optional: Store in DB (only if your service supports it)
      await matchService.storeMatchesInDatabase(matches);

      allMatches = [...allMatches, ...matches];
    }

    res.json(allMatches);
  } catch (error) {
    console.error('Error fetching combined matches:', error.message);
    res.status(500).json({ message: 'Failed to fetch matches', error: error.message });
  }
};


// Fetch La Liga matches from Football Data API
exports.getLaLigaMatches = async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PD/matches', {
      headers: { 'X-Auth-Token': process.env.API_KEY },
    });

    const matches = response.data.matches; // Extract match data

    // Store matches data in the database
    await matchService.storeMatchesInDatabase(matches); // Assuming matchService handles database operations

    // Send matches data back to the client
