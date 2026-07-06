const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth'); 

// @route   GET api/expenses
// @desc    Get all expenses for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // req.user contains the logged-in user's ID. Fetch only their specific expenses.
    const expenses = await Expense.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/expenses
// @desc    Create a new expense
router.post('/', auth, async (req, res) => {
  const { title, amount, category } = req.body;

  try {
    const newExpense = new Expense({
      title,
      amount,
      category,
      user: req.user // Save the logged-in user's ID along with the expense data
    });

    const expense = await newExpense.save();
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/expenses/:id
// @desc    Update an expense
router.put('/:id', auth, async (req, res) => {
  const { title, amount, category } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Security Check: Verify if the expense belongs to the currently logged-in user
    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: 'User not authorized to update this' });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;

    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/expenses/:id
// @desc    Delete an expense
router.delete('/:id', auth, async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    // Security Check: Verify if the expense belongs to the currently logged-in user
    if (expense.user.toString() !== req.user) {
      return res.status(401).json({ message: 'User not authorized to delete this' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense removed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;