const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.prod' }); // Load environment variables from .env.prod file

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI; // Get MongoDB URI from the environment variable
    if (!dbURI) {
      console.error("MongoDB URI is missing from the environment variables.");
      process.exit(1);
    }
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
