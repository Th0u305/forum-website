import { Outlet, useLocation, useNavigate } from "react-router";
import NavbarMenu2 from "../Pages/Navbar/NavbarMenu";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import "./spinner.css";
import ContextProvider from "../Context/ContextProvider";
import useAxiosMergeData from "../Hooks/useAxiosMergeData";

const Root = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [pathname]);

  const [loading, setLoading] = useState(false);
  const [mergedData] = useAxiosMergeData()

  setTimeout(() => {
    setLoading(true);
  }, 1000);

  return (
    <section className="max-w-7xl mx-auto p-5">
      {mergedData.length > 0 && loading ? (
        <ContextProvider>
          <HelmetProvider>
            <Toaster position="bottom-center" reverseOrder={false} />
            <NavbarMenu2></NavbarMenu2>
            <Outlet></Outlet>
          </HelmetProvider>
        </ContextProvider>
      ) : (
        <section className="flex justify-center items-center h-[96vh]">
          <div className="spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
      )}
    </section>
  );
};

export default Root;
