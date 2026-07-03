import React, { useState, useEffect } from 'react';

function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense, clearEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  // When editingExpense changes, update the form fields accordingly
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
    } else {
      setTitle('');
      setAmount('');
      setCategory('Food');
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    if (editingExpense) {
      // update the existing expense
      onUpdateExpense(editingExpense._id, { title, amount: Number(amount), category });
    } else {
      // add a new expense
      onAddExpense({ title, amount: Number(amount), category });
    }

    // Reset Form
    setTitle('');
    setAmount('');
    setCategory('Food');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Expense Title</label>
          <input
            type="text"
            placeholder="e.g., Grocery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Amount (LKR)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="md:col-span-3 text-right space-x-2">
          {editingExpense && (
            <button
              type="button"
              onClick={clearEdit}
              className="px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition text-sm cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-2.5 text-white font-semibold rounded-xl shadow-sm transition text-sm cursor-pointer ${
              editingExpense ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;