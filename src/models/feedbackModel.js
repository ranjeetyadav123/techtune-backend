const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
