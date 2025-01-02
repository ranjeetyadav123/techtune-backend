const Offer = require('../models/Offer');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Create an offer (Admin only)
exports.createOffer = async (req, res) => {
  const { title, categoryId, productId, discountPercentage, validUntil, gifUrl } = req.body;

  try {
    // Check if category and/or product exists
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }
    }

    // Create offer
    const newOffer = new Offer({
      title,
      categoryId,
      productId,
      discountPercentage,
      validUntil,
      gifUrl,
    });

    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
