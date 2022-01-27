import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireAuth = ({ component: Component, isAuthenticated, ...rest }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
