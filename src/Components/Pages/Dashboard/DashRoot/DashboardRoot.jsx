import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
        <Outlet></Outlet>
    </div>
  );
}

export default DashboardRoot;
