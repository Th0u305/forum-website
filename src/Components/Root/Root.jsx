import { Outlet } from "react-router";
import NavbarMenu2 from "../Pages/Navbar/NavbarMenu";
import DataContext from "../Context/DataContext";
import ContextProvider from "../Context/ContextProvider";
import toast, { Toaster } from "react-hot-toast";


const Root = () => {
  return (
    <section className="max-w-7xl mx-auto p-5">
      <ContextProvider>
      <DataContext>
        <Toaster/> 
        <NavbarMenu2></NavbarMenu2>
        <Outlet></Outlet>
      </DataContext>
      </ContextProvider>
    </section>
  );
};

export default Root;
