// backend/routes/playerRoutes.js

const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// Route: GET /api/players/stats
router.get('/stats', playerController.getPlayerStats);

// (Optional) Add more endpoints here later like:
// router.get('/top-assists', playerController.getTopAssists);

module.exports = router;
