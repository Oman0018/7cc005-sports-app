const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Route to fetch the EPL teams
router.get('/api/epl-teams', teamController.getEplTeams);

// Route to fetch the La Liga teams
router.get('/api/laliga-teams', teamController.getLaLigaTeams);

module.exports = router;
