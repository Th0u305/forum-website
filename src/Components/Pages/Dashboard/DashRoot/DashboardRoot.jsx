import { Outlet, Route, Routes } from "react-router";
import Sidebar from "../components/common/Sidebar";
import ContextProvider from "../../../Context/ContextProvider";

function DashboardRoot() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <ContextProvider>
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </ContextProvider>
    </div>
  );
}

export default DashboardRoot;
