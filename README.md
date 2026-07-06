# Personal Expense Tracker

A full-stack web application built using the **MERN Stack** to help users track and manage their daily expenses efficiently. This project was developed as a practical application to master full-stack architecture, RESTful API development, and modern responsive UI design.

---

## 🚀 Features

- **Full CRUD Operations**: Seamlessly Create, Read, Update, and Delete expense records.
- **Dynamic Live Analytics**: Real-time calculation and visualization of total expenses using a sleek dashboard layout.
- **Modern Responsive UI**: Clean and interactive user interface built with Tailwind CSS, fully optimized for mobile, tablet, and desktop viewports.
- **State Management**: Efficient state handling in React using functional components and hooks (`useState`, `useEffect`) for instant user feedback.
- **Robust REST API**: Decoupled backend architecture powered by Node.js and Express.js, using Mongoose ODM to communicate securely with MongoDB.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Functional Components & Hooks)
- **Vite** (Next-generation frontend tooling)
- **Tailwind CSS** (Utility-first styling framework)
- **Axios** (Promise-based HTTP client for API communication)

### Backend
- **Node.js** (JavaScript runtime environment)
- **Express.js** (Minimalist web framework for Node)
- **MongoDB** (NoSQL document database)
- **Mongoose** (Elegant MongoDB object modeling for Node.js)

### Code Quality & Standards
- **Oxlint** (High-performance JavaScript linter for maintaining clean code)
- **Git & GitHub** (Structured workflow using conventional commit practices)

---

## 📁 Project Structure

```text
personal-expense-tracker/
├── Backend/
│   ├── models/          # Mongoose Schemas (Expense.js)
│   ├── routes/          # API Endpoint Route Handlers
│   ├── server.js        # Express Server Entry Point
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── components/  # Modular Reusable UI Components
    │   │   ├── ExpenseForm.jsx
    │   │   ├── ExpenseList.jsx
    │   │   └── SummaryCards.jsx
    │   ├── App.jsx      # Main Application Component & State Layer
    │   └── main.jsx     # Vite Application Entry Point
    ├── package.json
    └── vite.config.js


    ⚙️ Installation & Local Setup
Follow these steps to set up and run the project locally on your development environment.

Prerequisites
Node.js installed on your local machine.

A local instance of MongoDB running or a MongoDB Atlas cloud connection string.

1. Clone the Repository
Bash
git clone [https://github.com/your-username/personal-expense-tracker.git](https://github.com/your-username/personal-expense-tracker.git)
cd personal-expense-tracker
2. Backend Environment Configuration
Navigate to the Backend directory and install the necessary dependencies:

Bash
cd Backend
npm install
Create a .env file in the root of the Backend directory and add the following environment variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the backend server:

Bash
npm start
3. Frontend Environment Configuration
Open a new terminal session, navigate to the Frontend directory, and install its dependencies:

Bash
cd ../Frontend
npm install
Start the Vite development server:

Bash
npm run dev
Open your browser and navigate to http://localhost:5173 to view the application.

👨‍💻 Author
Navindu Prabhashwara

GitHub: NaviGamage
