const axios = require('axios');
require('dotenv').config();

// Function to fetch EPL teams from Football Data API
async function fetchEPLTeams() {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PL/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY, // Your API token
      },
    });

    return response.data.teams; // Return the teams data
  } catch (error) {
    console.error('Error fetching EPL teams from Football Data API:', error.message);
    throw error;
  }
}

// Function to fetch La Liga teams from Football Data API
async function fetchLaLigaTeams() {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PD/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY, // Your API token
      },
    });

    return response.data.teams; // Return the teams data
  } catch (error) {
    console.error('Error fetching La Liga teams from Football Data API:', error.message);
    throw error;
  }
}

// Function to store teams in the database (already defined in your existing code)
async function storeTeamsInDatabase(teams) {
  // Logic to insert teams into your database
  // Use the appropriate query or ORM method
}

module.exports = {
  fetchEPLTeams,
  fetchLaLigaTeams,
  storeTeamsInDatabase,
};
