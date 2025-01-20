import Sidebar from "../DashMain/components/SideBar/Sidebar";
import ContextProvider from "../../../Context/ContextProvider";
import { Outlet, useLocation, useNavigate } from "react-router";
import PrivateRoute from "../../Private/Routes/PrivateRoute";
import { useEffect } from "react";

function DashboardRoot() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [pathname]);
  return (
    <div className="bg-gray-900 text-gray-100 overflow-hidden">
      {/* <Sidebar></Sidebar> */}
      <div className="ml-10 xl:ml-0">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default DashboardRoot;
