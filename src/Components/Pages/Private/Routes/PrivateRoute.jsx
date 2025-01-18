import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Context/ContextProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PrivateRoute = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { pathname } = useLocation();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    // Check authentication by making an API call

    try {
      axiosPublic.get(`${import.meta.env.VITE_AUTH_VALIDATION}`, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null || isAuthenticated === false || loading) {
    return (
      <div className="mt-12 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
 
  return isAuthenticated || user && user?.email ? children : <Navigate state={pathname} to="/login" replace />;
};

export default PrivateRoute;
