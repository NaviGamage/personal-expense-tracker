const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
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
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      default: 'expense',
      required: true,
    },

}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields to the schema
});

module.exports = mongoose.model('Expense', ExpenseSchema);