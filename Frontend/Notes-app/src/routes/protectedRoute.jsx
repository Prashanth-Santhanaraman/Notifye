import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/checkAuth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
