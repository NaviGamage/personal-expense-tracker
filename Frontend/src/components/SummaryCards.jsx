import React from 'react';

function SummaryCards({ expenses }) {
  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-md text-white">
        <p className="text-sm font-medium opacity-80">Total Expenses</p>
        <h3 className="text-3xl font-bold mt-1">LKR {total.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default SummaryCards;