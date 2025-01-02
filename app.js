const express = require('express');
const connectDB = require('./src/config/database'); // Ensure your DB connection is set up properly
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const offerRoutes = require('./src/routes/offerRoutes');
const adminRouters = require('./src/routes/adminRoutes');
require('dotenv').config({ path: '.env.prod' });

const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// CORS origin configuration
const corsOrigin = process.env.CORS_ORIGIN || '*';  // Fallback to '*' if not set

// CORS middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin: corsOrigin, // Use the dynamic CORS origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials to be sent with requests
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes Setup
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api', categoryRoutes);  // Category routes
app.use('/api', productRoutes);   // Product routes
app.use('/api', offerRoutes);     // Offer routes
app.use('/admin',adminRouters)
// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('Server is up and running!');  // Simpler response for better readability
});

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        console.log('Database connection established');
        
        // Start the server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is successfully running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        // Ensure server doesn't start if DB connection fails
        process.exit(1); // Exit process with failure if DB connection fails
    });
