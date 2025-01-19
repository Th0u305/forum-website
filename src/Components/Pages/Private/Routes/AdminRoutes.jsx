import { useContext } from "react";
import useAdmin from "../../../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../../Context/ContextProvider";

const AdminRoutes = ({children}) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user, loading } = useContext(AuthContext);
  const {pathname} = useLocation()

  if (loading || isAdminLoading) {
    return  <span className="loading loading-spinner loading-lg"></span>
  }

  if (user && isAdmin) {
    return children;
  } else {
    return <Navigate to="/" state={pathname}></Navigate>;
  }
};

export default AdminRoutes;
