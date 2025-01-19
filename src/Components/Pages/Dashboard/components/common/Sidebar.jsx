import {
  BarChart2,
  DollarSign,
  Home,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router";

const SIDEBAR_ITEMS = [
  {
    name : "Home",
    icon : Home,
    color : "#ffff",
    href : "/"
  },
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/dashboard",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/dashboard/products",
  },
  {
    name: "All Users",
    icon: Users,
    color: "#EC4899",
    href: "/dashboard/users",
  },
  {
    name: "Sales",
    icon: DollarSign,
    color: "#10B981",
    href: "/dashboard/sales",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    color: "#F59E0B",
    href: "/dashboard/orders",
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3B82F6",
    href: "/dashboard/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    color: "#6EE7B7",
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.div
      className={`fixed z-50 transition-all duration-100 ease-in-out flex-shrink-0 h-full ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 246 : 80 }}
      // onMouseEnter={() => setIsSidebarOpen(true)}
      // onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 ">
      <motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink key={item.href} to={item.href}>
              <motion.div className="hover:scale-105 transition-all duration-400 ease-in-out flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap overflow-hidden"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
