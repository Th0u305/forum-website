import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Input,
  Dropdown,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@heroui/react";
import ThemeSwitcher from "./Theme";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";


export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function NavbarMenu2() {
  const menuItems = [
    "Home",
    "Membership",
    "About"
  ];

  const {user, signOutUser} = useContext(AuthContext);

  const handleSignOut =()=>{
    signOutUser();
    if (!user) {
     return toast.error("Your're not logged in")
    }
    toast.success("Signed out successfully")
  }

  return (
    <Navbar isBlurred={false}  className="mt-5 bg-[#19191c] h-20 rounded-2xl">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <img className="w-11" src="https://res.cloudinary.com/dmegxaayi/image/upload/v1737414032/uvxcsxpapylanoocwcrg.png" alt="" />
          <p className="font-bold text-inherit">TopicTree</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarBrand>
        <img className="w-11" src="https://res.cloudinary.com/dmegxaayi/image/upload/v1737414032/uvxcsxpapylanoocwcrg.png" alt="" />
        <p className="font-bold text-inherit">TopicTree</p>
        </NavbarBrand>
        <NavbarItem>
          <Link isBlock color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isBlock color="foreground" href="/membership">
            Membership
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link isBlock color="foreground" href="#">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarContent as="div" className="items-center" justify="end">
        <NavbarItem className="hidden md:block">
          <Button as={Link} color="primary" href="/login" variant="flat" size="md">
            Login
          </Button>
        </NavbarItem>
         <div className="hidden md:block">
         <Input
            classNames={{
              base: "max-w-full sm:max-w-[12rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 dark:focus-within:!bg-default/60",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
         </div>
          {/* <ThemeSwitcher></ThemeSwitcher> */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className=" transition-transform"
                color="default"
                name="Jason Hughes"
                size="md"
                src={user?.photoURL || user?.image || "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem textValue="0p" key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email || "example@gmail.com"}</p>
              </DropdownItem>
              <DropdownItem textValue="dd" key="profile1" href="/dashboard/profile">My Settings</DropdownItem>
              <DropdownItem textValue="ff" key="overview" href="/dashboard/overview">Dashboard</DropdownItem>
              {user && <DropdownItem textValue="bb" key="Add post" href="/dashboard/addPost">Add Post</DropdownItem>}
              {user &&  <DropdownItem textValue="pp" key="My post" href="/dashboard/myPost">My Post</DropdownItem>}
              <DropdownItem textValue="nb" key="logout" color="danger" onPress={()=> handleSignOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>

      <NavbarMenu className="pt-28">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
          <NavbarMenuItem className="flex flex-col gap-3 mt-5 mb-5">
            <Link isBlock color="foreground" href="/">Home</Link>
            <Link isBlock color="foreground" href="/membership">Membership</Link>
            <Link isBlock color="foreground" href="/about">About</Link>
          </NavbarMenuItem>
        <NavbarItem>
          <Button as={Link} color="primary" size="lg" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
