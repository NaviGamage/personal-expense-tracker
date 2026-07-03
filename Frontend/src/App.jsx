import React from 'react';

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
          Personal Expense Tracker
        </h1>
        <p className="text-gray-500 font-medium">
          Welcome to the Personal Expense Tracker! This application allows you to track your expenses efficiently. You can add, view, update, and delete your expenses with ease. Start managing your finances today!
        </p>
      </div>
    </div>
  );
}

export default App;