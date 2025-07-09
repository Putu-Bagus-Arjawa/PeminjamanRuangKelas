import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {

    const {user, loading} = useAuth()
    
    if (loading) return <div>Loading...</div>;
    if(!user)  return <Navigate to="/login" replace />;

    const isAdminPage = location.pathname.startsWith("/admin") ||
                        location.pathname.startsWith("/profileadmin") ||
                        location.pathname.startsWith("/manajemenruangan") ||
                        location.pathname.startsWith("/editruangan") ||
                        location.pathname.startsWith("/approve") ||
                        location.pathname.startsWith("/manajemenpengguna") ||
                        location.pathname.startsWith("/edituser");

  if (isAdminPage && user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  } 
    return <Outlet/>
}

export default ProtectedRoutes

