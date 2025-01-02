const express = require('express');
const { addFeedback, getFeedback, updateFeedback, deletefeedback } = require('../controller/feedbackController');
const authenticateUser = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateUser,addFeedback);  
router.get('/', authenticateUser, getFeedback);  
router.put('/:feedbackId', authenticateUser, updateFeedback);  
router.delete('/:feedbackId', authenticateUser,deletefeedback ); 

module.exports = router;