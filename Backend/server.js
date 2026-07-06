const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (helps in handling data from Frontend)
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/auth', require('./routes/auth'));

// Basic Route (test route to check if the server is running)
app.get('/', (req, res) => {
    res.send('Expense Tracker Backend is running successfully!');
});

// 3. Database Connection & Server Start (Standard Way)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

