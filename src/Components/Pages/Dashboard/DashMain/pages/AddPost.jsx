import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Select from "react-select";
import useAxiosTags from "../../../../Hooks/useAxiosTags";
import useAxiosCategory from "../../../../Hooks/useAxiosCategory";
import { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useForm } from "react-hook-form";
import useAxiosSecureData from "../../../../Hooks/useAxiosSecureData";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../../../Context/ContextProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { Button } from "@heroui/react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const image_hosting_cloud_name = import.meta.env.VITE_IMAGE_CLOUD_NAME;

const AddPost = () => {
  const [tags] = useAxiosTags();
  const [category] = useAxiosCategory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [filterData, setFilterData] = useState([]);
  const { user } = useContext(AuthContext);
  const [users, refetch] = useAxiosSecureData();
  const axiosSecure = useAxiosSecure();
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  useEffect(() => {
    const filterData = users?.users?.find((item) => item.email === user.email);
    setFilterData(filterData);
  }, [refetch()]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const options = tags?.map((item) => ({
    value: item._id,
    label: item.tags,
  }));
  const options2 = category?.map((item) => ({
    value: item._id,
    label: item.category,
  }));

  const handleChange = (option) => {
    setSelectedOption(option);
  };
  const handleChange2 = (option) => {
    setSelectedOption2(option);
  };
// console.log(filterData);

  const onsubmit = async (e) => {
    await refetch();

    if (
      (filterData.posts.length === 5 &&
        filterData.membershipStatus === "Bronze") ) {
      Swal.fire({
        title: "Buy membership!",
        text: "You reached your limit as a free user , You can only post 5 post per month",
        icon: "error",
        draggable: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/membership");
        }
      });
      return;
    }
    if (e.postTitle.length < 5) {
      return setErrorMsg("Please write more than 5 words");
    } else {
      setErrorMsg("");
    }

    if (e.postDetails.length < 10) {
      return setErrorMsg2("Please write more than 10 words");
    } else {
      setErrorMsg2("");
    }
    await refetch();

    const result = await selectedOption?.map(({ label }) => label);

    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Creating your post",
      showConfirmButton: false,
      timer: 3000,
    });

    const formData = new FormData();
    formData.append("file", e.photo[0]);
    formData.append("upload_preset", "formProject");

    const result2 = await axios.post(
      `https://api.cloudinary.com/v1_1/${image_hosting_cloud_name}/image/upload`,
      formData
    );

    const data = {
      id: users?.postTotal + 1,
      authorId: filterData?.id,
      title: e?.postTitle,
      description: e?.postDetails,
      tags: result,
      upVotes: null,
      downVotes: null,
      comments: [],
      category: selectedOption2?.label,
      createdAt: Date(),
      image: result2.data.url,
    };

    axiosSecure.post(`/${import.meta.env.VITE_URL__17}`, { data }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Post Added",
          icon: "success",
          draggable: false,
        });
        reset();
      }
    });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 h-screen">
      <Header title="Add Post" />
      <main className="lg:max-w-4xl mx-auto py-6 px-4 lg:px-8 mt-16">
        {/* SALES STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="">
            <div className="bg-[#e2e2e2] p-6 md:p-12 rounded-lg">
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-5 w-fit mx-auto">
                  {user ? (
                    <img
                      src={
                        user?.photoURL ||
                        filterData?.profileImage || 
                        "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"

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
                    {...register("Name")}
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
                    Post Title
                  </label>
                  <input
                    required
                    {...register("postTitle")}
                    type="text"
                    placeholder="Enter your post title"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6  text-gray-600 outline-none focus:border-[#3B9DF8] focus:shadow-md"
                  />
                  <p className="text-red-600">{errorMsg}</p>
                </div>
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                  Select Category and Tags
                </label>
                <div className="flex flex-col md:flex-row gap-5 mb-5">
                  <Select
                    required
                    options={options2} // Pass custom options
                    value={selectedOption2} // Bind selected value
                    onChange={handleChange2} // Handle change
                    placeholder="Search Category"
                    isSearchable // Enable search functionality
                    isClearable
                    components={animatedComponents}
                    className="w-full md:w-1/2 text-black rounded-md focus:shadow-md"
                  />

                  <Select
                    required
                    options={options} // Pass custom options
                    value={selectedOption} // Bind selected value
                    onChange={handleChange} // Handle change
                    placeholder="Search Tags"
                    isSearchable // Enable search functionality
                    isMulti
                    isClearable
                    components={animatedComponents}
                    className="text-black w-full md:w-1/2 rounded-md focus:shadow-md"
                  />
                </div>

                <div className="mb-5 pt-3">
                  <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Post Details
                  </label>
                  <textarea
                    required
                    placeholder="Write your post description"
                    {...register("postDetails")}
                    className="border-[#e5eaf2] border rounded-lg bg-white outline-none px-4 min-h-[200px] py-3 w-full focus:border-[#3B9DF8] focus:shadow-md text-gray-600"
                  />
                  <p className="text-red-600">{errorMsg2}</p>
                </div>
                <div className="flex flex-col gap-5 mb-5">
                <Button size="sm" variant="solid">
                      <FaThumbsUp className="text-blue-400" />
                      0
                    </Button>
                    <Button size="sm" variant="solid">
                      <FaThumbsDown className="text-red-400" />
                      0
                    </Button>
                </div>

                <div className="space-y-8 font-[sans-serif] mb-5">
                  <input
                    required
                    {...register("photo")}
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
      </main>
    </div>
  );
};
export default AddPost;
