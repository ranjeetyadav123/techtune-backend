// src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  paymentStatus: { type: String, default: 'Pending' },
  paymentDetails: {
    transactionId: { type: String },
    paymentMode: { type: String },
  },
});

module.exports = mongoose.model('Order', orderSchema);
