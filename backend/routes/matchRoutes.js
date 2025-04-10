const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController'); // Import match controller

// Combined match fetch
router.get('/', matchController.getAllMatches);

// (Optional) Specific league routes
router.get('/epl', matchController.getEplMatches);
router.get('/laliga', matchController.getLaLigaMatches);
router.get('/champions-league', matchController.getChampionsLeagueMatches);

module.exports = router;
