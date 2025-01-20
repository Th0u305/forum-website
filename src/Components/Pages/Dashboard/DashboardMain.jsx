import React from "react";
import DashboardRoot from "./DashRoot/DashboardRoot";
import Sidebar from "./DashMain/components/SideBar/Sidebar";
import ContextProvider from "../../Context/ContextProvider";

const DashboardMain = () => {
  
  return (
    <div>
      <ContextProvider>
        <Sidebar></Sidebar>
        <DashboardRoot/>
      </ContextProvider>
    </div>
  );
};

export default DashboardMain;
