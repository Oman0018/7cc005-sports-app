const axios = require('axios');

// Supported league codes
const SUPPORTED_LEAGUES = ['PL', 'PD', 'SA', 'CL', 'BL1']; // add more if needed

exports.getPlayerStats = async (req, res) => {
  const league = req.query.league || 'PL'; // Default to Premier League

  if (!SUPPORTED_LEAGUES.includes(league)) {
    return res.status(400).json({ error: 'Invalid or unsupported league code' });
  }

  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/${league}/scorers`,
      {
        headers: { 'X-Auth-Token': process.env.API_KEY }
      }
    );
    res.json(response.data.scorers);
  } catch (error) {
    console.error('Error fetching player stats:', error.message);
    res.status(500).json({ error: 'Failed to fetch player stats' });
  }
};
