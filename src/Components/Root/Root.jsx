import { Outlet, useLocation, useNavigate } from "react-router";
import NavbarMenu2 from "../Pages/Navbar/NavbarMenu";
import DataContext from "../Context/DataContext";
import ContextProvider from "../Context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Root = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [pathname]);
  return (
    <section className="max-w-7xl mx-auto p-5">
      <ContextProvider>
        <HelmetProvider>
          <DataContext>
            <Toaster />
            <NavbarMenu2></NavbarMenu2>
            <Outlet></Outlet>
          </DataContext>
        </HelmetProvider>
      </ContextProvider>
    </section>
  );
};

export default Root;
