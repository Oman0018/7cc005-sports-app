const axios = require('axios'); // Import axios for HTTP requests

// Function to fetch EPL teams from Football Data API
async function getEplTeams() {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PL/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY, // Ensure your API_KEY is stored in the .env file
      },
    });
    return response.data.teams; // Return the teams data
  } catch (error) {
    console.error('Error fetching EPL teams:', error);
    throw error; // Propagate the error to be handled elsewhere
  }
}

// Function to fetch La Liga teams from Football Data API
async function getLaLigaTeams() {
  try {
    const response = await axios.get('https://api.football-data.org/v2/competitions/PD/teams', {
      headers: {
        'X-Auth-Token': process.env.API_KEY, // Ensure your API_KEY is stored in the .env file
      },
    });
    return response.data.teams; // Return the teams data
  } catch (error) {
    console.error('Error fetching La Liga teams:', error);
    throw error; // Propagate the error to be handled elsewhere
  }
}

module.exports = {
  getEplTeams,
  getLaLigaTeams,
};
