import React, { useContext, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router";
import useAxiosPosts from "../../Hooks/useAxiosPosts";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import {
  FaComment,
  FaEllipsisH,
  FaFlag,
  FaListUl,
  FaMedal,
  FaPaperPlane,
  FaRegLifeRing,
  FaRegSave,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Clock, Delete, List, MessageCircleWarning, Tags } from "lucide-react";
import { FaDeleteLeft, FaEllipsisVertical } from "react-icons/fa6";
import { FacebookShareButton } from "react-share";
import { Helmet } from "react-helmet-async";
import AddLikes from "../../Functions/AddLikes";
import useAxiosComments from "../../Hooks/useAxiosComments";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AddComments from "../../Functions/AddComments";
import useAdmin from "../../Hooks/useAdmin";
import DeleteComment from "../../Functions/DeleteComment";
import LoadComments from "../../Functions/LoadComments";
import Swal from "sweetalert2";
import SubmitCommentReport from "../../Functions/SubmitCommentReport";

const SinglePost = () => {
  const params = useParams();
  const [singleData, setSingleData] = useState([]);
  const [mergedData, refetch] = useAxiosMergeData();
  const [users, userFetch] = useAxiosUsers();
  const [comments, commentRefetch] = useAxiosComments();
  const { user, setSearchData, searchData } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [isAdmin] = useAdmin();

  const badgeColors = {
    Bronze: "text-[#cd7f32]", // Bronze color
    Gold: "text-[#ffd700]", // Gold color
    Platinum: "text-[#ff6363]", // Platinum color
  };

  useEffect(() => {
    axiosPublic
      .get(`/${import.meta.env.VITE_URL__8}?allData=allData`)
      .then((res) => {
        setSingleData(res.data.filter((item) => item._id === params.id));
      });
  }, []);

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
    SubmitReport(user, users, postData, axiosSecure);
    return setSearchData(singleData);
  };

  // report comment
  const handleCommentReport = (commentData) => {
    return SubmitCommentReport(user, users, commentData, axiosSecure);
  };

  // adding comments
  const handleComment = async (e, postId, id) => {
    AddComments(
      e,
      postId,
      users,
      user,
      comments,
      axiosSecure,
      refetch,
      setSearchData
    );
    LoadComments(axiosPublic, id + 1, setSearchData, setSingleData, params);
  };

  refetch();
  userFetch();
  commentRefetch();

  // loading comments
  const handleLoadComment = async (id) => {
    setLoading(true);
    setLoading2(false);

    setTimeout(async () => {
      setLoading(false);
      setLoading2(true);
    }, 1000);
    LoadComments(axiosPublic, id, setSearchData, setSingleData, params);
  };

  // delete comments

  const handleDeleteComment = async (_id, index, post_id, id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteComment(user, _id, index, post_id, axiosSecure);
        await LoadComments(
          axiosPublic,
          id,
          setSearchData,
          setSingleData,
          params
        );
      }
    });
  };

  return (
    <div className="mx-auto -z-10">
      {singleData.length > 0 ? (
        singleData.map((item, index) => (
          <Card className="py-4 mb-12 rounded-lg" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <Image
                  alt="Card background "
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.author?.profileImage}
                />
                <h1>{item?.author?.username}</h1>

                <div className="flex flex-wrap gap-4">
                  <Popover key="default" color="default" placement="top">
                    <PopoverTrigger>
                      <Button
                        className="capitalize min-w-0 px-0 bg-inherit"
                        color="default"
                      >
                        <FaMedal
                          className={`${
                            badgeColors[item?.author?.badges || "Bronze"] ||
                            "text-gray-500"
                          } text-2xl`}
                        ></FaMedal>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border border-slate-400">
                      {item?.author?.badges}
                    </PopoverContent>
                  </Popover>
                </div>
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
              <CardBody className="flex flex-row justify-between items-center mt-4">
                <Button
                  size="sm"
                  variant="flat"
                  className="rounded-lg min-w-12 md:min-w-16 xl:min-w-24"
                  onPress={() => handleLikes("upVotes", item.id)}
                >
                  <FaThumbsUp className="text-blue-400" />
                  {item.upVotes}
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  className="rounded-lg min-w-12 md:min-w-16 xl:min-w-24"
                  onPress={() => handleLikes("downVotes", item.id)}
                >
                  <FaThumbsDown className="text-orange-500" /> {item?.downVotes}
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  className="rounded-lg min-w-12 md:min-w-16 xl:min-w-24"
                >
                  <FaComment className="text-green-400" />
                  {item.comments.length}
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  className="rounded-lg min-w-12 md:min-w-16 xl:min-w-24"
                >
                  <FacebookShareButton url="google.com">
                    <FaShare className="text-yellow-400 inline-flex mr-2" />
                    {item.commentData.length + 15}
                  </FacebookShareButton>
                </Button>
                <Dropdown className="rounded-lg" backdrop="blur">
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="flat"
                      className="rounded-lg min-w-12 md:min-w-16 xl:min-w-24"
                    >
                      <FaListUl className="text-violet-500 text-xl"></FaListUl>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded">
                    <DropdownItem textValue="ff" key="new">
                      <FaRegSave className="inline-flex mr-3 text-blue-400 text-lg" />{" "}
                      Save post
                    </DropdownItem>
                    <DropdownItem textValue="ss" key="copy">
                      <FaDeleteLeft className="inline-flex mr-3 text-yellow-400 text-lg" />{" "}
                      Hide post
                    </DropdownItem>
                    <DropdownItem textValue="w" key="edit">
                      <FaRegLifeRing className="inline-flex mr-3 text-red-500 text-lg" />{" "}
                      Block
                    </DropdownItem>
                    <DropdownSection showDivider></DropdownSection>
                    <DropdownItem
                      onPress={() => showInputModal(item)}
                      textValue="4t"
                      className="text-orange-500"
                    >
                      <FaFlag className="inline-flex mr-3 text-lg" />
                      Report Post
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
                <CardBody className="bg-[#262629] max-w-lg relative rounded-r-lg rounded-bl-lg">
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
                <div className="text-sm bg-slate-600 text-white p-3 rounded-r-lg rounded-bl-lg w-fit">
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
                      <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownItem
                          textValue="aw"
                          key="new"
                          onPress={() => handleCommentReport(item2)}
                        >
                          <MessageCircleWarning className="text-orange-500 inline-flex mr-2" />{" "}
                          Report Comment
                        </DropdownItem>
                        {(item2?.authorEmail === user?.email || isAdmin) && (
                          <DropdownItem
                            textValue="dd"
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onPress={() =>
                              handleDeleteComment(
                                item2._id,
                                index,
                                item._id,
                                item.comments.length
                              )
                            }
                          >
                            <Delete className="inline-flex mr-2" /> Delete
                            Comment
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </p>
                </div>
              </CardBody>
            ))}
            {loading && <Spinner color="warning" label="Loading..." />}
            {loading2 && (
              <button
                onClick={() => handleLoadComment(item.commentData.length)}
                className="inline-flex justify-center gap-2 mt-5"
              >
                <FaEllipsisH className="my-auto text-xl" /> Load more comments
              </button>
            )}
          </Card>
        ))
      ) : (
        <div className="w-fit mx-auto mt-20">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default SinglePost;
