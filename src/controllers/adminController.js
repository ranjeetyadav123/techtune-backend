const User = require('../models/User');

// Fetch All Orders (Admin Only)
exports.getAllOrders = async (req, res) => {
  try {
    // Aggregate orders from all users
    const orders = await User.aggregate([
      { $unwind: '$orderHistory' }, // Deconstruct the orderHistory array
      {
        $project: {
          _id: 0,
          orderId: '$orderHistory.orderId',
          userId: '$_id',
          fullName: '$fullName',
          email: '$email',
          status: '$orderHistory.status',
          amount: '$orderHistory.amount',
          paymentStatus: '$orderHistory.paymentStatus',
          paymentDetails: '$orderHistory.paymentDetails',
        },
      },
    ]);

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
