const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user-related operations like login and registration
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
