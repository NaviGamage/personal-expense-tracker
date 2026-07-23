import React, { useState, useEffect } from 'react';

// Separate Category lists for Income and Expense
const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Shopping', 'Health', 'General'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Business', 'Investments', 'Gifts', 'Other Income'];

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, clearEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // Default is 'expense'
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setType(editingExpense.type || 'expense');
      setCategory(editingExpense.category || (editingExpense.type === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]));
    }
  }, [editingExpense]);

  // Dynamically switch categories when user changes Type (Income <-> Expense)
  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    if (selectedType === 'income') {
      setCategory(INCOME_CATEGORIES[0]);
    } else {
      setCategory(EXPENSE_CATEGORIES[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      type,
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense._id, expenseData);
    } else {
      onAddExpense(expenseData);
    }

    // Reset Form
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory(EXPENSE_CATEGORIES[0]);
  };

  const activeCategories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {editingExpense ? 'Edit Transaction' : 'Add New Transaction'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Type Switcher Tabs */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl max-w-xs">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
              type === 'expense'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Expense (-)
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Income (+)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
            <input
              type="text"
              placeholder={type === 'income' ? "e.g. Monthly Salary, Project Payment" : "e.g. Grocery, Electricity Bill"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Amount (LKR)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              min="0"
              step="any"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white capitalize"
            >
              {activeCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className={`px-5 py-2.5 font-semibold rounded-lg text-sm text-white shadow-md transition duration-200 ${
              type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingExpense ? 'Update Entry' : 'Add Entry'}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={clearEdit}
              className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg text-sm transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;