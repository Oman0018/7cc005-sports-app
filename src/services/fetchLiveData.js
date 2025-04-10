// src/services/fetchLiveData.js

const API_TOKEN = process.env.REACT_APP_FOOTBALL_API_KEY;

export const fetchFootballMatches = async () => {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures?api_token=${API_TOKEN}&include=home_team;away_team;scores&filters[status]=live`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching football matches:', error);
    throw error;
  }
};
