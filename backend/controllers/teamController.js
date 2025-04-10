const teamService = require('../services/teamService'); // Import the service for database insertion

// Controller function to fetch EPL teams from Football Data API
exports.getEplTeams = async (req, res) => {
  try {
    const teams = await teamService.fetchEPLTeams(); // Fetch teams from the service
    await teamService.storeTeamsInDatabase(teams); // Store the teams into the database
    res.json(teams); // Send teams data back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EPL teams', error: error.message });
  }
};

// Controller function to fetch La Liga teams from Football Data API
exports.getLaLigaTeams = async (req, res) => {
  try {
    const teams = await teamService.fetchLaLigaTeams(); // Fetch La Liga teams from the service
    await teamService.storeTeamsInDatabase(teams); // Store the teams into the database
    res.json(teams); // Send teams data back to the client
  } catch (error) {
    res.status(500).json({ message: 'Error fetching La Liga teams', error: error.message });
  }
};
