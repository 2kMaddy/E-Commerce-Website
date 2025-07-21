import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("adminToken");
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

export default ProtectedRoute;
