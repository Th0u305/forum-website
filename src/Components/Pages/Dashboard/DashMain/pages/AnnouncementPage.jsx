import AnnTable from "../components/annTable/AnnTable";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/ContextProvider";
import useAxiosSecureData from "../../../../Hooks/useAxiosSecureData";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Announcement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const [users, refetch] = useAxiosSecureData();
  const axiosSecure = useAxiosSecure();
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filterData = users?.users?.find((item) => item.email === user.email);
    setFilterData(filterData);
  }, [refetch()]);

  const onsubmit = (e) => {
    const data = {
      title: e.title,
      details: e.postDetails,
      adminId: filterData.id,
    };
    axiosSecure.post("/announcement", { data }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Announcement Added",
          icon: "success",
          draggable: false,
        });
        reset();
      }else{
        return Swal.fire({
          title: "Something went wrong please try again",
          icon: "warning",
          draggable: false
        });
      }
    });
    refetch();
  };

  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Announcement"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 h-screen space-y-10">
        <motion.div
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="">
            <div className="bg-[#e2e2e2] p-6 md:p-12 rounded-2xl">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-5 w-fit mx-auto">
                  {user ? (
                    <img
                      src={
                        user?.photoURL ||
                        user?.profileImage ||
                        filterData?.profileImage
                      }
                      className="rounded-full w-28 h-28 object-cover"
                      alt=""
                    />
                  ) : (
                    <CgProfile className="text-[10rem] text-gray-600" v />
                  )}
                </div>
                <div className="mb-5">
                  <label
                    for="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder={
                      user?.displayName ||
                      user?.username ||
                      filterData?.username
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  text-gray-600 outline-none focus:border-[#3B9DF8] focus:shadow-md"
                  />
                </div>
                <div className="mb-5">
                  <label
                    for="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Announcements Title
                  </label>
                  <input
                    required
                    {...register("title")}
                    type="text"
                    placeholder="Enter your post title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  text-gray-600 outline-none focus:border-[#3B9DF8] focus:shadow-md"
                  />
                  <p className="text-red-600">{errorMsg}</p>
                </div>

                <div className="mb-5 pt-3">
                  <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Announcements Details
                  </label>
                  <textarea
                    required
                    placeholder="Write your post description"
                    {...register("postDetails")}
                    className="border-[#e5eaf2] border rounded-xl bg-white outline-none px-4 min-h-[200px] py-3 w-full focus:border-[#3B9DF8] focus:shadow-md text-gray-600"
                  />
                  <p className="text-red-600">{errorMsg2}</p>
                </div>

                <div className="space-y-8 font-[sans-serif] mb-5">
                  <input
                    type="file"
                    className="w-full text-gray-500 font-medium text-lg bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded-md"
                  />
                </div>

                <div>
                  <button className="hover:shadow-form w-full hover:scale-105 duration-200 ease-in-out active:scale-95 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    Add Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <AnnTable />
      </main>
    </div>
  );
};
export default Announcement;
