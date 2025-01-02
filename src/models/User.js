// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\d{10}$/, 'Please enter a valid phone number.']
  },
  phoneVerified: { type: Boolean, default: false }, // Flag to verify the phone number during registration
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true, match: [/^\d{6}$/, 'Please enter a valid pin code.'] }
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  orderHistory: [
    {
      orderId: { type: String, required: true },
      status: { type: String, required: true },
      amount: { type: Number, required: true },
      paymentStatus: { type: String, required: true },
      paymentDetails: {
        transactionId: { type: String },
        paymentMode: { type: String },
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
