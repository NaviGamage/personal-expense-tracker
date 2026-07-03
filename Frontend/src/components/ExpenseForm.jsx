import React, { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAddExpense({ title, amount: Number(amount), category });
    setTitle('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Expense</h3>
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
        <div className="md:col-span-3 text-right">
          <button type="submit" className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition text-sm cursor-pointer">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;