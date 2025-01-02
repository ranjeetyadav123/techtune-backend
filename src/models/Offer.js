const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },  // Optional: Offer can be for a category
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },    // Optional: Offer can be for a specific product
  gifUrl: { type: String, required: true },  // Using GIF animation instead of an image
  discountPercentage: { type: Number, required: true },
  validUntil: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
