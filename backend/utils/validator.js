const { body, validationResult } = require('express-validator'); // Import express-validator for validation

// Validator function for user registration
const validateUserRegistration = [
  body('username')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('first_name')
    .notEmpty()
    .withMessage('First name is required'),
  body('last_name')
    .notEmpty()
    .withMessage('Last name is required'),
  
  // Custom validation middleware to check for errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }
    next(); // If no validation errors, proceed to the next middleware/handler
  }
];

// Validator function for user login
const validateUserLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  // Custom validation middleware to check for errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }
    next(); // If no validation errors, proceed to the next middleware/handler
  }
];

module.exports = {
  validateUserRegistration,
  validateUserLogin
};

