import Sidebar from "../components/common/Sidebar";
import ContextProvider from "../../../Context/ContextProvider";
import { Outlet } from "react-router";
import PrivateRoute from "../../Private/Routes/PrivateRoute";

function DashboardRoot() {
  return (
    <div className="bg-gray-900 text-gray-100 overflow-hidden">
      <ContextProvider>
        <PrivateRoute>
        <Sidebar></Sidebar>
        <div className="ml-20 lg:ml-16 xl:ml-0">
          <Outlet></Outlet>
        </div>
        </PrivateRoute>
      </ContextProvider>
    </div>
  );
}

export default DashboardRoot;
