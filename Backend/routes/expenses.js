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

// 3. DELETE Route - Delete an expense from the database
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found!' });
        }

        await expense.deleteOne();
        res.status(200).json({ message: 'Expense deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. PUT Route - Update an existing expense in the database
router.put('/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // new: true returns the updated document, runValidators: true ensures that the update adheres to the schema validation rules
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found!' });
        }

        res.status(200).json(updatedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;