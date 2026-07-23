import React from 'react';

function SummaryCards({ expenses }) {
  // Calculate Total Income
  const totalIncome = expenses
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // Calculate Total Expenses
  const totalExpense = expenses
    .filter((item) => item.type === 'expense' || !item.type) // Handles old entries defaults to expense
    .reduce((sum, item) => sum + Number(item.amount), 0);

  // Calculate Net Savings / Balance
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Income Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-md text-white">
        <p className="text-sm font-medium opacity-90">Total Income</p>
        <h3 className="text-2xl font-bold mt-1">LKR {totalIncome.toLocaleString()}</h3>
      </div>

      {/* Total Expense Card */}
      <div className="bg-gradient-to-r from-rose-500 to-red-600 p-6 rounded-2xl shadow-md text-white">
        <p className="text-sm font-medium opacity-90">Total Expenses</p>
        <h3 className="text-2xl font-bold mt-1">LKR {totalExpense.toLocaleString()}</h3>
      </div>

      {/* Net Balance Card */}
      <div className={`p-6 rounded-2xl shadow-md text-white bg-gradient-to-r ${
        netBalance >= 0 ? 'from-blue-600 to-indigo-600' : 'from-amber-600 to-orange-600'
      }`}>
        <p className="text-sm font-medium opacity-90">Net Balance</p>
        <h3 className="text-2xl font-bold mt-1">LKR {netBalance.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default SummaryCards;