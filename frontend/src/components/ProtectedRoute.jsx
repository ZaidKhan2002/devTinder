// components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Otherwise, render children
  return children;
};

export default ProtectedRoute;
