import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-800">Expense History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400 font-medium">
                  No expenses recorded yet.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{expense.title}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-600">
                      {expense.category}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    LKR {expense.amount.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onDeleteExpense(expense._id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;