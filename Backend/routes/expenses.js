const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Importing the Expense model to interact with the expenses collection in the database

// 1. GET Route - Get all expenses from the database
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 }); // Sort by date in descending order
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST Route - Add a new expense to the database
router.post('/', async (req, res) => {
    const { title, amount, category, date } = req.body;

    const newExpense = new Expense({
        title,
        amount,
        category,
        date
    });

    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;