import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SummaryCards from '../components/SummaryCards';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { AuthContext } from '../context/AuthContext';

// Fetch the base API URL from environment variables for high flexibility
const API_URL = `${import.meta.env.VITE_API_URL}/expenses`;

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExpense, setEditingExpense] = useState(null);
  
  const { logout, user } = useContext(AuthContext);

  // Fetch all expenses belonging to the currently authenticated user
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

  // Handle the creation of a new expense record
  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post(API_URL, newExpense);
      setExpenses([response.data, ...expenses]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  // Handle updates to an existing expense record by ID
  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedExpense);
      setExpenses(expenses.map((exp) => (exp._id === id ? response.data : exp)));
      setEditingExpense(null); 
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  // Handle removal of an expense record from database and state
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
      if (editingExpense?._id === id) setEditingExpense(null); 
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Responsive Dashboard Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-5 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Personal Expense Tracker
            </h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Welcome, {user?.name || 'User'}! Manage your daily expenses efficiently and stay on budget.
            </p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm text-sm transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Dynamic content rendering depending on the loading state */}
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
              onEditExpense={(expense) => setEditingExpense(expense)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;