const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  const { name, price, originalPrice, categoryId, imageUrl, description } = req.body;

  try {
    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create product
    const newProduct = new Product({
      name,
      price,
      originalPrice,
      categoryId,
      imageUrl,
      description,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products by category
exports.getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ categoryId });
    res.json({ categoryId, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products (optional filtering by category)
exports.getAllProducts = async (req, res) => {
  const { categoryId } = req.query;

  try {
    const products = categoryId
      ? await Product.find({ categoryId })
      : await Product.find();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
