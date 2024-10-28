import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate state={{ from: location }} to="/login" replace />;
};

export default PrivateRoute;
