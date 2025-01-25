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
  Input,
  Pagination,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import {
  FaFlag,
  FaListUl,
  FaPaperPlane,
  FaRegLifeRing,
  FaRegSave,
  FaThumbsUp,
} from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaComment, FaDeleteLeft, FaMedal } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FacebookShareButton } from "react-share";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosComments from "../../Hooks/useAxiosComments";

const Posts = () => {
  const [users, userFetch] = useAxiosUsers();
  const [mergedData, refetch] = useAxiosMergeData();
  const [comments, commentRefetch] = useAxiosComments();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, searchData, setSearchData } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [pageNumber, setPageNumber] = useState([]);

  const badgeColors = {
    Bronze: "text-[#cd7f32]", // Bronze color
    Gold: "text-[#ffd700]", // Gold color
    Platinum: "text-[#e5e4e2]", // Platinum color
  };

  useEffect(() => {
    axiosPublic
      .get(`/mergedAllData?page=${pageNumber}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [pageNumber, mergedData]);

  // update likes
  const handleLikes = (data, id) => {
    if (!user && !user?.email) {
      return toast.error("You're not logged in");
    }

    const filter = {
      name: data,
      id: id,
    };

    axiosSecure.patch("/updateLikes", { filter }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  // submit report
  const showInputModal = async (postData) => {
    if (!user && !user?.email) {
      return Swal.fire({
        title: "You're not logged in",
        icon: "warning",
      });
    }
    const { value: userInput } = await Swal.fire({
      title: "Enter Your Text",
      input: "textarea",
      inputPlaceholder: "Type your report...",
      html: `
          <div class="">
            <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
            <select id="reportOption"  class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected >Select a category option</option>
              <option value="Suicide or self-injury">Suicide or self-injury</option>
              <option value="Child abuse">Child abuse</option>
              <option value="Human trafficking">Human trafficking</option>
              <option value="Convicted sex offenders">Convicted sex offenders</option>
              <option value="False news">False news</option>
              <option value="Intellectual property infringement">Intellectual property infringement</option>
              <option value="Intellectual property infringement">Content from friends</option>
              <option value="DContent from groupsE">Content from groups</option>
              <option value="Public follower content">Public follower content</option>
              <option value="Unconnected content">Unconnected content</option>
            </select>
          </div>
        `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        const optionValue = document.getElementById("reportOption")?.value;

        if (!value) {
          return "You need to write something!";
        }
        if (optionValue.length === 0) {
          return "Please select and option";
        }
      },
    });

    const filterUser = users.find((item) => item.email === user.email);
    const optionValue = document.getElementById("reportOption")?.value;

    const data = {
      postId: postData.id,
      userId: filterUser.id,
      reportDetails: userInput,
      reportOption: optionValue,
    };

    axiosSecure.post("/makeReport", { data }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Your report has bean submitted",
          icon: "success",
        });
      }
    });
  };

  userFetch();
  // console.log(mergedData);

  // console.log(mergedData);

  const handleComment = async (e, postId) => {
    e.preventDefault();
    const filterUser = await users?.find((item) => item?.email === user?.email);

    const comment = e.target.comment.value;

    const data = {
      id: comments.length + 1,
      postId: postId,
      authorId: filterUser.id,
      text: comment,
      createdAt: Date(),
      image: filterUser?.profileImage,
    };

    axiosSecure.post("/addComments", { data }).then((res) => {
      console.log(res.data);
    });
  };
console.log(mergedData);

  return (
    <div className="mx-auto">
      {(user?.email?.length && mergedData.length) > 0 ? (
        (searchData.length === 0 ? mergedData : searchData).map(
          (item, index) => (
            <Card className="py-4 mb-12" key={index}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
                <div className="flex items-center gap-2">
                  <Image
                    alt="Card background"
                    className="rounded-full w-12 h-12 object-cover"
                    src={item.author?.profileImage}
                  />
                  <h1>{item?.author?.username}</h1>
                  <h1>
                    <FaMedal
                      className={`${
                        badgeColors[
                          item?.author?.badges[0] ||
                            item?.author?.badge ||
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
                  loading="lazy"
                  alt="Card background"
                  onClick={() => navigate(`/post/${item._id}`)}
                  className="object-cover md:w-screen rounded-xl cursor-pointer"
                  src={item?.image}
                />
                <CardBody className="flex flex-row flex-wrap gap-5 justify-between">
                  <div className="flex gap-5 flex-wrap">
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => handleLikes("upVotes", item.id)}
                    >
                      <FaThumbsUp className="text-blue-400" />
                      {item.upVotes}
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => handleLikes("downVotes", item.id)}
                    >
                      <FaThumbsDown className="text-red-400" /> {item.downVotes}
                    </Button>
                    <Button size="sm" variant="flat">
                      <FaComment className="text-green-400" />
                      {item.commentData.length}
                    </Button>
                    <Button size="sm" variant="flat" className="p-0 ">
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
                    <Dropdown>
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
                    src={user?.photoURL}
                  />
                  <Textarea
                    name="comment"
                    className="max-w-md relative"
                    minRows={2}
                    placeholder="Add a comment"
                  />
                  <button type="submit">
                    <FaPaperPlane className="absolute z-50 right-24 top-7 text-2xl cursor-pointer active:scale-90 ease-in-out duration-200"></FaPaperPlane>
                  </button>
                </form>
              </CardBody>

              {item?.commentData?.map((item2, index) => (
                <CardBody key={index} className="flex flex-row gap-5">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-full w-8 h-8"
                    src={
                      item2?.image ||
                      users[item2.authorId]?.profileImage ||
                      item?.author?.profileImage
                    }
                  />
                  <div className="text-sm bg-slate-600 text-white p-3 rounded-2xl max-w-md">
                    <p className="text-black">{users[item2.authorId]?.username}</p>
                    <p>{item2.text}</p>
                  </div>
                </CardBody>
              ))}
            </Card>
          )
        )
      ) : (
        <div className="w-fit mx-auto mt-20">
          <Spinner size="lg" />
        </div>
      )}
      <Pagination
        className="mx-auto w-fit"
        initialPage={1}
        total={10}
        onChange={(initialPage) => setPageNumber(initialPage)}
      />
    </div>
  );
};

export default Posts;
