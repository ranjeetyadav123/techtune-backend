const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageUrl: { type: String, required: true },
  description: {
    model: { type: String, required: true },
    items: { type: [String], required: true },
    condition: { type: String, required: true },
    warranty: { type: String },
    invoice: { type: Boolean, default: false },
    cashOnDelivery: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
