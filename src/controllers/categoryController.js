const Category = require('../models/Category');

// Create a new category (Admin only)

exports.createCategory = async (req, res) => {
  console.log("Cat",req.body)
  const { name, description, imageUrl } = req.body;

  try {
    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create category
    const newCategory = new Category({
      name,
      description,
      imageUrl,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
