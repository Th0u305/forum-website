// import React from 'react';
// import { Outlet } from 'react-router';
// import Sidebar from '../components/common/Sidebar';
// import OverviewPage from "../pages/OverviewPage";


// const DashboardRoot = () => {
//     return (
//         <div className='h-screen'>
//             <Sidebar></Sidebar>
//         </div>
//     );
// };

// export default DashboardRoot;






import { Outlet, Route, Routes } from "react-router";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import UsersPage from "../pages/UsersPage";
import SalesPage from "../pages/SalesPage";
import OrdersPage from "../pages/OrdersPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import SettingsPage from "../pages/SettingsPage";
import Sidebar from "../components/common/Sidebar";


function DashboardRoot() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar></Sidebar>
            <Outlet></Outlet>
		</div>
	);
}

export default DashboardRoot;