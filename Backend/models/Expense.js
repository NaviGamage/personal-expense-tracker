const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive number']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Food', 'Rent', 'Transport', 'Entertainment', 'Salary', 'Other'] // List of allowed categories
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields to the schema
});

module.exports = mongoose.model('Expense', ExpenseSchema);