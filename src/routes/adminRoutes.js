const express = require('express');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const { getAllOrders } = require('../controllers/adminController');
const cloudinaryController = require('../controllers/cloudinaryController');
const router = express.Router();

// Route to get all orders (Admin Only)
router.get('/orders', authenticate, isAdmin, getAllOrders);
router.post('/upload', cloudinaryController.uploadImage);
module.exports = router;
