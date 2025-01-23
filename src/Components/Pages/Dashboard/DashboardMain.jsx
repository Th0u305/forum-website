import React from "react";
import DashboardRoot from "./DashRoot/DashboardRoot";
import Sidebar from "./DashMain/components/SideBar/Sidebar";
import ContextProvider from "../../Context/ContextProvider";
import { Helmet } from "react-helmet-async";

const DashboardMain = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <ContextProvider>
        <Sidebar></Sidebar>
        <DashboardRoot />
      </ContextProvider>
    </div>
  );
};

export default DashboardMain;
