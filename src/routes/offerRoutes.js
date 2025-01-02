const express = require('express');
const { createOffer, getOffers } = require('../controllers/offerController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all offers (accessible by everyone)
router.get('/offers', isAdmin,getOffers);

// Create a new offer (only accessible by admin)
router.post('/offers', authenticate, isAdmin, createOffer);

module.exports = router;
