import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryCards from './components/SummaryCards';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null); //save the expense being edited

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post(API_URL, newExpense);
      setExpenses([response.data, ...expenses]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Update an existing expense
  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedExpense);
      // In the Ui, update the expense in the state
      setExpenses(expenses.map((exp) => (exp._id === id ? response.data : exp)));
      setEditingExpense(null); // cancel the edit mode after updating
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
      if (editingExpense?._id === id) setEditingExpense(null); // when editing expense is deleted, clear the edit state
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Personal Expense Tracker
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Manage your daily expenses efficiently and stay on budget.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10 font-medium text-gray-500">
            Loading data from server...
          </div>
        ) : (
          <>
            <SummaryCards expenses={expenses} />

            <ExpenseForm
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              onUpdateExpense={handleUpdateExpense}
              clearEdit={() => setEditingExpense(null)}
            />

            <ExpenseList
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={(expense) => setEditingExpense(expense)} // Edit button click sets the expense to be edited
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;