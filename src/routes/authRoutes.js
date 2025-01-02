const express = require('express');
const { registerUser, loginUser,getUserDetails } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user and get JWT token
router.post('/login', loginUser);
router.get('/profile',authenticate, getUserDetails);
module.exports = router;
