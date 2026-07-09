import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If there is no token, redirect the user to the login page immediately
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access to the requested protected component
  return children;
};

export default ProtectedRoute;