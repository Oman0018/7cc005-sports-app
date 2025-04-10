//backend/routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/stats', playerController.getPlayerStats);

module.exports = router;


