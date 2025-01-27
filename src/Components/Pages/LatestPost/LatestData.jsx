import React, { useContext, useEffect, useState } from "react";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Spinner,
} from "@heroui/react";
import {
  FaEllipsisH,
  FaFlag,
  FaListUl,
  FaMedal,
  FaPaperPlane,
  FaRegLifeRing,
  FaRegSave,
  FaThumbsUp,
} from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaComment, FaDeleteLeft, FaEllipsisVertical } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { AuthContext } from "../../Context/ContextProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FacebookShareButton } from "react-share";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AddLikes from "../../Functions/AddLikes";
import SubmitReport from "../../Functions/SubmitReport";
import useAxiosComments from "../../Hooks/useAxiosComments";
import AddComments from "../../Functions/AddComments";
import LoadComments from "../../Functions/LoadComments";
import useAdmin from "../../Hooks/useAdmin";

const LatestData = () => {
  const [users, userFetch] = useAxiosUsers();
  const [mergedData, refetch] = useAxiosMergeData();
  const [comments, commentRefetch] = useAxiosComments();
  const { user, searchData , setSearchData} = useContext(AuthContext);
  const [latestData, setLatestData] = useState();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const randomData = latestData?.slice(-15);
  const [isAdmin] = useAdmin()

  const badgeColors = {
    Bronze: "text-[#cd7f32]", // Bronze color
    Gold: "text-[#ffd700]", // Gold color
    Platinum: "text-[#ff6363]", // Platinum color
  };

  useEffect(() => {
    axiosPublic
      .get(`/mergedAllData?latest=${true}`)
      .then((res) => {
        setLatestData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [latestData]);

  // update likes
  const handleLikes = (data, id) => {
    return AddLikes(
      user,
      data,
      id,
      axiosSecure,
      refetch,
      userFetch,
      commentRefetch
    );
  };

  // submit report
  const showInputModal = async (postData) => {
    return SubmitReport(user, users, postData, axiosSecure);
  };


  refetch();
  userFetch();
  commentRefetch();

  // adding comments
  const handleComment = async (e, postId) => {
    return AddComments(
      e,
      postId,
      users,
      user,
      comments,
      axiosSecure,
      refetch,
      setSearchData
    );
  };

  return (
    <div className="">
      <Helmet>
        <title>TopicTree | LatestPost</title>
      </Helmet>
      {latestData?.length > 0 ? (
        (searchData.length > 5 ? searchData : randomData)?.map(
          (item, index) => (
            <Card className="py-4 mb-12 rounded-lg" key={index}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
                <div className="flex items-center gap-2">
                  <Image
                    alt="Card backg "
                    className="rounded-full w-12 h-12 object-cover"
                    src={item.author?.profileImage}
                  />
                  <h1>{item?.author?.username}</h1>
                  <h1>
                    <FaMedal
                      className={`${
                        badgeColors[
                            item?.author?.badges ||
                            "Bronze"
                        ] || "text-gray-500"
                      } text-2xl`}
                    ></FaMedal>
                  </h1>
                </div>

                <div className="text-start">
                  <h4 className="font-bold text-large">{item.title}</h4>
                  <p className="max-w-md">{item.description}</p>
                </div>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  onClick={() => navigate(`/post/${item._id}`)}
                  className="object-cover md:w-screen rounded-lg cursor-pointer"
                  src={item?.image}
                />
                <CardBody className="flex flex-row flex-wrap gap-5 justify-between">
                  <div className="flex gap-5 flex-wrap">
                    <Button
                      size="sm"
                      variant="flat"
                      className="rounded-lg"
                      onPress={() => handleLikes("upVotes", item.id)}
                    >
                      <FaThumbsUp className="text-blue-400" />
                      {item.upVotes}
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className="rounded-lg"
                      onPress={() => handleLikes("downVotes", item.id)}
                    >
                      <FaThumbsDown className="text-red-400" />{" "}
                      {item?.downVotes}
                    </Button>
                    <Button size="sm" variant="flat" className="rounded-lg">
                      <FaComment className="text-green-400" />
                      {item?.commentData.length}
                    </Button>
                    <Button size="sm" variant="flat" className="p-0 rounded-lg">
                      <FacebookShareButton
                        url="google.com"
                        className="h-8 w-16"
                      >
                        <FaShare className="text-yellow-400 inline-flex mr-2" />
                        {item.commentData.length + 15}
                      </FacebookShareButton>
                    </Button>
                  </div>
                  <div>
                    <Dropdown className="rounded-lg">
                      <DropdownTrigger>
                        <Button size="sm" variant="flat">
                          <FaListUl className="text-violet-500 text-xl"></FaListUl>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownItem textValue="ff" key="new">
                          <FaRegSave className="inline-flex mr-3 text-blue-400" />{" "}
                          Save post
                        </DropdownItem>
                        <DropdownItem textValue="ss" key="copy">
                          <FaDeleteLeft className="inline-flex mr-3 text-yellow-400" />{" "}
                          Hide post
                        </DropdownItem>
                        <DropdownItem textValue="w" key="edit">
                          <FaRegLifeRing className="inline-flex mr-3 text-green-400" />{" "}
                          Block
                        </DropdownItem>
                        <DropdownSection showDivider></DropdownSection>
                        <DropdownItem
                          onPress={() => showInputModal(item)}
                          textValue="4t"
                          className="text-red-400"
                        >
                          <FaFlag className="inline-flex mr-3" />
                          Report Post
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </CardBody>
              </CardBody>

              <CardBody>
                <form
                  className="flex flex-row gap-5"
                  onSubmit={(e) => handleComment(e, item.id)}
                >
                  <Image
                    alt="Card background"
                    className="object-cover rounded-full w-8 h-8"
                    src={
                      user?.photoURL ||
                      user?.image ||
                      "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"
                    }
                  />
                  <CardBody className="bg-[#262629] max-w-sm relative rounded-r-lg rounded-bl-lg">
                    <textarea
                      required
                      name="comment"
                      className="bg-inherit text-blue-300 placeholder:text-blue-300 resize-none max-w-xs border-none focus:border-none active:border-none outline-none"
                      rows={2}
                      placeholder="Add a comment"
                    />
                    <button type="submit">
                      <FaPaperPlane className="absolute z-20 right-5 top-7 text-xl cursor-pointer active:scale-90 ease-in-out duration-200"></FaPaperPlane>
                    </button>
                  </CardBody>
                </form>
              </CardBody>

              {item?.commentData?.map((item2, index) => (
                <CardBody key={index} className="flex flex-row gap-5">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-full w-8 h-8"
                    src={
                      item2?.image ||
                      users[index]?.profileImage ||
                      "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"
                    }
                  />
                  <div className="text-sm bg-slate-600 text-white p-3 rounded-r-lg rounded-bl-lg max-w-sm">
                    <p className="text-blue-300 text-lg">
                      {item2?.name || users[item2?.authorId]?.username}
                    </p>
                    <p className="inline-flex">
                      {item2?.text}
                      <Dropdown backdrop="blur">
                        <DropdownTrigger className="ml-7">
                          <button className="active:scale-90 ease-in-out duration-100">
                            <FaEllipsisVertical className="my-auto" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Static Actions"
                          variant="faded"
                        >
                          <DropdownItem key="new">Report Comment</DropdownItem>
                          {isAdmin && <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete Comment
                          </DropdownItem>}
                        </DropdownMenu>
                      </Dropdown>
                    </p>
                  </div>
                </CardBody>
              ))}
              <button
                // onClick={() => handleLoadComment(item.commentData.length)}
                onClick={() => navigate(`/post/${item._id}`)}
                className="inline-flex justify-center gap-2 mt-5"
              >
                <FaEllipsisH className="my-auto text-xl" /> Load more comments
              </button>
            </Card>
          )
        )
      ) : (
        <div className="w-fit mx-auto mt-20">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default LatestData;
