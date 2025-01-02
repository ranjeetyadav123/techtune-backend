const express = require('express');
const { createProduct, getAllProducts, getProductsByCategory } = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all products (optional filtering by category)
router.get('/products', getAllProducts);

// Get products by category
router.get('/products/category/:categoryId', getProductsByCategory);

// Create a new product (only accessible by admin)
router.post('/products', authenticate, isAdmin, createProduct);

module.exports = router;
