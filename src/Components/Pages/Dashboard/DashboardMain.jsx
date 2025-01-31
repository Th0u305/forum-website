import React from "react";
import DashboardRoot from "./DashRoot/DashboardRoot";
import ContextProvider from "../../Context/ContextProvider";

const DashboardMain = () => {
  return (
    <div>
      <ContextProvider>
        <DashboardRoot/>
      </ContextProvider>
    </div>
  );
};

export default DashboardMain;
