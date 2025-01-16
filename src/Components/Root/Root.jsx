import { Outlet } from "react-router";
import NavbarMenu2 from "../Parts/Navbar/NavbarMenu";
import DataContext from "../Context/DataContext";

const Root = () => {
  return (
    <section className="max-w-7xl mx-auto p-5">
      <DataContext>
        <NavbarMenu2></NavbarMenu2>
        <Outlet></Outlet>
      </DataContext>
    </section>
  );
};

export default Root;
