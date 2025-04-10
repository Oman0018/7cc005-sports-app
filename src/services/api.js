//src/services/api.js
// src/services/api.js

import axios from 'axios';

// Replace this with the actual endpoint you're using
const API_BASE_URL = 'https://soccer-football-info.p.rapidapi.com/emulation/totalcorner/match/schedule/';

// Your RapidAPI key for authentication
const API_KEY = 'e490258db1msh8d733016abb1978p184c87jsn0a67746c5b89';

// This function fetches the match schedule based on the date
export const fetchMatchSchedule = async (date = '20231013') => {
    try {
        // Construct the full URL with query parameters
        const url = `${API_BASE_URL}?date=${date}&l=en_US`;
        
        // Make the GET request
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-host': 'soccer-football-info.p.rapidapi.com',
                'x-rapidapi-key': API_KEY
            }
        });
        
        // Return the data from the response
        return response.data;
    } catch (error) {
        console.error('Error fetching match schedule:', error);
        throw error;
    }
};

// Example function to fetch data using axios (you can expand this for other APIs too)
export const fetchLiveScores = async () => {
    try {
        const endpoint = 'https://api.football-data.org/v4/matches';
        const response = await axios.get(endpoint, {
            headers: {
                'X-Auth-Token': 'your-actual-api-key-here' // Update with your actual API key for football-data.org
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching live scores:', error);
        throw error;
    }
};
