import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Context/ContextProvider";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="mt-12 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={pathname} replace></Navigate>;
};

export default PrivateRoute;
