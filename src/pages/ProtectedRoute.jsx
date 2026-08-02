import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({children, requiredRole}){
    const { isAuthenticated, userRole}=useAuth();
    const location = useLocation();

    if(!isAuthenticated){
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    if (requiredRole && userRole?.toLowerCase() !== requiredRole.toLowerCase()) {
        return <Navigate to="/" replace />;
    }
    return children
}
export default ProtectedRoute;
