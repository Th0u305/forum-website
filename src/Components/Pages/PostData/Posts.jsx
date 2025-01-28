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
  Pagination,
  Spinner,
} from "@heroui/react";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import {
  FaEllipsisH,
  FaFlag,
  FaListUl,
  FaPaperPlane,
  FaRegLifeRing,
  FaRegSave,
  FaThumbsUp,
} from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import {
  FaComment,
  FaDeleteLeft,
  FaEllipsisVertical,
  FaMedal,
} from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/ContextProvider";
import { FacebookShareButton } from "react-share";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosComments from "../../Hooks/useAxiosComments";
import AddLikes from "../../Functions/AddLikes";
import PageNumberData from "../../Functions/PageNumberData";
import SubmitReport from "../../Functions/SubmitReport";
import AddComments from "../../Functions/AddComments";
import useAdmin from "../../Hooks/useAdmin";
import { Delete, MessageCircleWarning, Reply } from "lucide-react";
import SubmitCommentReport from "../../Functions/SubmitCommentReport";
import DeleteComment from "../../Functions/DeleteComment";

const Posts = () => {
  const [users, userFetch] = useAxiosUsers();
  const [mergedData, refetch] = useAxiosMergeData();
  const [comments, commentRefetch] = useAxiosComments();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, searchData, setSearchData } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();

  const badgeColors = {
    Bronze: "text-[#cd7f32]", // Bronze color
    Gold: "text-[#ffd700]", // Gold color
    Platinum: "text-[#ff6363]", // Platinum color
  };

  // page number
  const handlePageNumber = (id) => {
    return PageNumberData(id, axiosPublic, setSearchData);
  };

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

  // report comment
  const handleCommentReport = (commentData) => {
    return SubmitCommentReport(user, users, commentData, axiosSecure);
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

  refetch();
  userFetch();
  commentRefetch();

  // delete comments
  const handleDeleteComment = async (_id, index, post_id, id) => {
    DeleteComment(user, _id, index, post_id, axiosSecure);
  };

  return (
    <div className="mx-auto">
      {mergedData.length > 0 ? (
        (searchData.length === 0 || searchData.length === 2
          ? mergedData
          : searchData
        ).map((item, index) => (
          <Card className="py-4 mb-12 rounded-lg" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <Image
                  alt="Card background "
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.author?.profileImage}
                />
                <h1>{item?.author?.username}</h1>
                <h1>
                  <FaMedal
                    className={`${
                      badgeColors[item?.author?.badges || "Bronze"] ||
                      "text-gray-500"
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
              <CardBody className="grid grid-cols-4 grid-rows-1 p-0 mt-7 gap-5 md:grid-cols-5">
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
                  <FaThumbsDown className="text-orange-500" /> {item?.downVotes}
                </Button>
                <Button size="sm" variant="flat" className="rounded-lg">
                  <FaComment className="text-green-400" />
                  {item?.commentData.length}
                </Button>
                <Button size="sm" variant="flat" className="p-0 rounded-lg">
                  <FacebookShareButton url="google.com" className="h-8 w-16">
                    <FaShare className="text-yellow-400 inline-flex mr-2" />
                    {item.commentData.length + 15}
                  </FacebookShareButton>
                </Button>
                <Dropdown className="rounded-lg" backdrop="blur">
                  <DropdownTrigger>
                    <Button size="sm" variant="flat">
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
                      <DropdownMenu aria-label="Static Actions" variant="faded">
                        <DropdownItem textValue="aw" key="new"><MessageCircleWarning className="text-orange-500 inline-flex mr-2" /> Report Comment</DropdownItem>
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
                           <Delete className="inline-flex mr-2" /> Delete Comment
                          </DropdownItem>
                        )}
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
        ))
      ) : (
        <div className="w-fit mx-auto mt-20">
          <Spinner size="lg" />
        </div>
      )}
      <Pagination
        className="mx-auto w-fit"
        initialPage={1}
        total={10}
        onChange={(initialPage) => handlePageNumber(initialPage)}
      />
    </div>
  );
};

export default Posts;
