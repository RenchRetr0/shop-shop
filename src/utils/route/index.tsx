import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
