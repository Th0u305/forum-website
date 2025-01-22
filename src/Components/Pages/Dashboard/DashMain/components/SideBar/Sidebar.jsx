import {
  BarChart2,
  Home,
  MegaphoneIcon,
  Menu,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router";
import { CgComment } from "react-icons/cg";
import { FaCommentDots, FaMoneyBill } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import useAdmin from "../../../../../Hooks/useAdmin";

const SIDEBAR_ITEMS = [
  {
    name: "Home",
    icon: Home,
    color: "#ffff",
    href: "/",
  },
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/dashboard/overview",
  },
  {
    name: "All Users",
    icon: Users,
    color: "#EC4899",
    href: "/dashboard/users",
  },
  {
    name: "Add Post",
    icon: CgComment,
    color: "#10B981",
    href: "/dashboard/addPost",
  },
  {
    name: "My Posts",
    icon: FaCommentDots,
    color: "#F59E0B",
    href: "/dashboard/myPost",
  },
  {
    name: "Report",
    icon: HiOutlineDocumentReport,
    color: "#3B82F6",
    href: "/dashboard/reports",
  },
  {
    name: "Announcement",
    icon: MegaphoneIcon,
    color: "#8B5CF6",
    href: "/dashboard/announcement",
  },
  {
    name: "Payments History",
    icon: FaMoneyBill,
    color: "#F59E0B",
    href: "/dashboard/paymentHistory",
  },
  {
    name: "Profile",
    icon: User,
    color: "#6EE7B7",
    href: "/dashboard/profile",
  },
];

const SIDEBAR_ITEMS2 = [
  {
    name: "Home",
    icon: Home,
    color: "#ffff",
    href: "/",
  },
  {
    name: "Add Post",
    icon: CgComment,
    color: "#10B981",
    href: "/dashboard/addPost",
  },
  {
    name: "My Posts",
    icon: FaCommentDots,
    color: "#F59E0B",
    href: "/dashboard/myPost",
  },
  {
    name: "Payments History",
    icon: FaMoneyBill,
    color: "#F59E0B",
    href: "/dashboard/paymentHistory",
  },
  {
    name: "Profile",
    icon: User,
    color: "#6EE7B7",
    href: "/dashboard/profile",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin] = useAdmin();

  return (
    <motion.div
      className={`fixed z-50 transition-all duration-100 ease-in-out flex-shrink-0 h-full ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 246 : 80 }}
      // onMouseEnter={() => setIsSidebarOpen(true)}
      // onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-xl p-4 flex flex-col border-r border-gray-700 ">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {isAdmin ? (
            <div>
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
            </div>
          ) : (
            <div>
              {SIDEBAR_ITEMS2.map((item) => (
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
            </div>
          )}
        </nav>
      </div>
    </motion.div>
  );
};
export default Sidebar;
