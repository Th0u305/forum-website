import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import useAxiosSecureData from "../../../../../Hooks/useAxiosSecureData";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  DropdownSection,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { firebaseAuth } from "../../../../Private/firebase/firebase.config";
import {
  deleteUser,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import useAxiosAdminData from "../../../../../Hooks/useAxiosAdminData";
import { AuthContext } from "../../../../../Context/ContextProvider";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState();
  const axiosSecure = useAxiosSecure();
  const { deleteUserData, user } = useContext(AuthContext);
  const [users, refetch] = useAxiosAdminData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSearch = (e) => {
    refetch();
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.users?.filter(
      (user) =>
        user?.username?.toLowerCase()?.includes(term) ||
        user?.email?.toLowerCase()?.includes(term) ||
        user?.role?.toLowerCase()?.includes(term) ||
        user?.membershipStatus?.toLowerCase()?.includes(term)
    );
    refetch();
    setFilteredUsers(filtered);
  };

  const onsubmit = (e) => {
    refetch();
    const membership = e.membership;
    const role = e.role;
    const email = e.email;
    const id = e.id;

    if (membership.length === 0 && role.length === 0) {
      return Swal.fire({
        title: "You Didn't changed anything",
        icon: "question",
        draggable: false,
      });
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `${
        role.length > 0 ? "Changed role to Admin" : "Didn't changed The Role"
      } and ${
        membership.length > 0
          ? `Changed membership Status to ${membership}`
          : "Didn't changed membership Status"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/${import.meta.env.VITE_URL__15}`, {
            membership,
            role,
            email,
            id,
          })
          .then(async (res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Changed information",
                icon: "success",
              });
              await refetch();
            }
          });
      }
    });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/${import.meta.env.VITE_URL__15}/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });

    // const user = firebaseAuth.currentUser;

    // const { isConfirmed } = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "Click confirm to enter your password.",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Confirm",
    //   cancelButtonText: "Cancel",
    // });

    // if (isConfirmed && user) {

    // 	try {
    // 	const provider = new GoogleAuthProvider()
    // 	await reauthenticateWithPopup(user, provider)
    // 	console.log("Reauthenticated successfully.");

    // 	await user.delete();
    // 	alert("Deleted User")
    // 	}catch(error){
    // 		alert("Error", error)
    // 	}
    //   const { value: password } = await Swal.fire({
    //     title: "Enter your password",
    //     input: "password",
    //     inputLabel: "Password",
    //     inputPlaceholder: "Enter your password",
    //     inputAttributes: {
    //       maxlength: "10",
    //       autocapitalize: "off",
    //       autocorrect: "off",
    //     },
    //     showCancelButton: true,
    //     confirmButtonText: "Submit",
    //     cancelButtonText: "Cancel",
    //   });

    //   try {
    //     // Reauthenticate the user
    //     const credential = EmailAuthProvider.credential(user.email, password); // Replace with actual password
    //     await reauthenticateWithCredential(user, credential);

    //     // Delete the user
    //     await deleteUser(user);
    //     alert("User Deleted");
    //     navigate("/");
    //   } catch (error) {
    //     alert("Please give correct credential");
    //   }
    // }

    // axiosSecure.delete(`/adminPriv/${id}`).then(res => console.log(res.data))
    // Swal.fire({
    // 	title: "Are you sure?",
    // 	text: "You won't be able to revert this!",
    // 	icon: "warning",
    // 	showCancelButton: true,
    // 	confirmButtonColor: "#3085d6",
    // 	cancelButtonColor: "#d33",
    // 	confirmButtonText: "Yes, delete it!"
    //   }).then((result) => {
    // 	if (result.isConfirmed) {
    // 	  Swal.fire({
    // 		title: "Deleted!",
    // 		text: "Your file has been deleted.",
    // 		icon: "success"
    // 	  });
    // 	}
    //   });
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-lg p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
        <div className="relative mb-6 mt-6">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto h-96">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Membership
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {(filteredUsers || users.users)?.map((user) => (
              <motion.tr
                key={user?._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user?.username?.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {user?.username}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-100 ${
                      user.role === "Admin" || user.role === "admin"
                        ? "bg-red-800"
                        : "bg-blue-800"
                    }`}
                  >
                    {user?.role || "User"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.membershipStatus === "Premium" ||
                      user.membershipStatus === "Member"
                        ? "bg-green-800 text-green-100"
                        : "bg-yellow-700 text-red-100"
                    }`}
                  >
                    {user?.membershipStatus}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex gap-2">
                  <Dropdown backdrop="blur" className="w-72 h-44">
                    <DropdownTrigger>
                      <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                        <Edit size={18} />
                      </button>
                    </DropdownTrigger>
                    <form onSubmit={handleSubmit(onsubmit)}>
                      <input
                        {...register("email")}
                        type="text"
                        className="hidden"
                        value={user.email}
                      />
                      <input
                        {...register("id")}
                        type="text"
                        className="hidden"
                        value={user._id}
                      />
                      <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownSection aria-label="Preferences">
                          <DropdownItem
                            key="theme"
                            isReadOnly
                            className="cursor-default"
                            endContent={
                              <select
                                {...register("membership")}
                                className="cursor-pointer z-10 outline-none w-20 py-0.5 rounded-md text-md group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent"
                              >
                                <option selected></option>
                                <option className="text-black">Free</option>
                                <option className="text-black">Member</option>
                                <option className="text-black">Premium</option>
                              </select>
                            }
                          >
                            Change MemberShip
                          </DropdownItem>
                        </DropdownSection>
                        <DropdownSection aria-label="Preferences">
                          <DropdownItem
                            key="theme"
                            isReadOnly
                            className="cursor-default"
                            endContent={
                              <select
                                {...register("role")}
                                className="cursor-pointer text-red-500 z-10 outline-none w-20 py-0.5 rounded-md text-md group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent"
                              >
                                <option selected></option>
                                <option>User</option>
                                <option>Admin</option>
                              </select>
                            }
                          >
                            Change Role
                          </DropdownItem>
                        </DropdownSection>

                        <DropdownItem
                          closeOnSelect
                          key="confirm"
                          className="text-success w-fit mx-auto p-0"
                          color="success"
                        >
                          <button type="submit" className="w-16 h-10">
                            Confirm
                          </button>
                        </DropdownItem>
                      </DropdownMenu>
                    </form>
                  </Dropdown>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
