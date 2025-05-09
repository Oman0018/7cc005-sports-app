const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController'); // Import match controller

// ⚽ All Matches
router.get('/', matchController.getAllMatches);

// 🔴 LIVE Matches
router.get('/live', matchController.getLiveMatches);

// ✅ Finished Matches / Results
router.get('/results', matchController.getFinishedMatches);

// 🌍 League-specific matches (optional)
router.get('/epl', matchController.getEplMatches);
router.get('/laliga', matchController.getLaLigaMatches);
router.get('/champions-league', matchController.getChampionsLeagueMatches);

module.exports = router;
