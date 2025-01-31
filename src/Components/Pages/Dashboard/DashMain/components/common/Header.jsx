import SidebarDrawer from "../SideBar/SidebarDrawer";

const Header = ({ title }) => {
	return (
		<header className='fixed w-full z-10 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700 flex py-4 px-4 sm:px-6 lg:px-8'>
			<SidebarDrawer/>
			<div className='max-w-7xl mx-auto '>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>
		</header>
	);
};
export default Header;
