const axios = require('axios');

const API_URL = 'https://api.football-data.org/v4/matches';
const HEADERS = { headers: { 'X-Auth-Token': process.env.API_KEY } };

// Get ALL matches
exports.getAllMatches = async (req, res) => {
  try {
    const response = await axios.get(API_URL, HEADERS);
    res.json(response.data.matches);
  } catch (err) {
    console.error('Failed to fetch matches:', err.message);
    res.status(500).json({ message: 'Failed to fetch matches', error: err.message });
  }
};

// ✅ Get LIVE matches only
exports.getLiveMatches = async (req, res) => {
  try {
    const response = await axios.get(API_URL, HEADERS);
    const liveMatches = response.data.matches.filter(match => match.status === 'LIVE');
    res.json(liveMatches);
  } catch (err) {
    console.error('Failed to fetch live matches:', err.message);
    res.status(500).json({ message: 'Failed to fetch live matches', error: err.message });
  }
};

// ✅ Get FINISHED matches only (results)
exports.getFinishedMatches = async (req, res) => {
  try {
    const response = await axios.get(API_URL, HEADERS);
    const finishedMatches = response.data.matches.filter(match => match.status === 'FINISHED');
    res.json(finishedMatches);
  } catch (err) {
    console.error('Failed to fetch finished matches:', err.message);
    res.status(500).json({ message: 'Failed to fetch finished matches', error: err.message });
  }
};
