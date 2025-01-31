import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Link,
} from "@heroui/react";
import {
  BarChart2,
  Home,
  MegaphoneIcon,
  Menu,
  User,
  Users,
} from "lucide-react";
import { CgComment } from "react-icons/cg";
import { FaCommentDots, FaMoneyBill } from "react-icons/fa";
import {
  HiOutlineDocumentRemove,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { NavLink } from "react-router";

export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};
import { AnimatePresence, motion } from "framer-motion";

export default function SidebarDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

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
      color: "#3B82F6",
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
      name: "Reported Posts",
      icon: HiOutlineDocumentReport,
      color: "#EC4899",
      href: "/dashboard/reportPosts",
    },
    {
      name: "Reported Comments",
      icon: HiOutlineDocumentRemove,
      color: "#EC4899",
      href: "/dashboard/reportComments",
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

  return (
    <>
      <div className="flex flex-wrap gap-3 w-fit">
        <Button
          // key={placement}
          className="min-w-0 gap-0 h-min px-0 bg-inherit hover:scale-110 border-0 outline-0"
          onPress={onOpen}
        >
          <Menu size={30} />
        </Button>
      </div>
      <Drawer
        backdrop="blur"
        isOpen={isOpen}
        placement={placement}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              duration: 5,
            },
            exit: {
              x: 100,
              opacity: 0,
              duration: 5,
            },
          },
        }}
      >
        <DrawerContent className="bg-[#171f2e] rounded-none">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Dashboard Menu
              </DrawerHeader>
              <DrawerBody>
                {SIDEBAR_ITEMS.map((item) => (
                  <NavLink key={item.href} to={item.href}>
                    <motion.div className="hover:scale-105 transition-all duration-400 ease-in-out flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 mb-2">
                      <item.icon
                        size={20}
                        style={{ color: item.color, minWidth: "20px" }}
                      />
                      <AnimatePresence>
                        <motion.span
                          className="ml-4 whitespace-nowrap overflow-hidden"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2, delay: 0.3 }}
                        >
                          {item.name}
                        </motion.span>
                      </AnimatePresence>
                    </motion.div>
                  </NavLink>
                ))}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
