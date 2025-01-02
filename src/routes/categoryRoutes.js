const express = require('express');
const { createCategory, getCategories } = require('../controllers/categoryController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all categories (accessible by everyone)
router.get('/categories', getCategories);

// Create a new category (only accessible by admin)
router.post('/categories',  createCategory);

module.exports = router;
