import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

// adminOnly={true} solo ADMIN
// adminOnly={false} cualquier usuario autenticado
export function PrivateRoute({ adminOnly = false }) {
  const { token, isAdmin } = useAuthContext();

  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
