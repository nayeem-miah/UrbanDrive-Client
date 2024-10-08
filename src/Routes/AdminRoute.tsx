import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import useRole from "../Hooks/useRole";
import { SyncLoader } from "react-spinners";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  // Type of role can be more specific if you have predefined roles
  const [role, isPending] = useRole();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SyncLoader color="#593cfb" size={18} />
      </div>
    );
  }

  if (role === "Admin") {
    return <>{children}</>; // Ensures the return is typed correctly for ReactNode
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
