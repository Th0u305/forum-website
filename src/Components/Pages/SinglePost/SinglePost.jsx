import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosComments from "../../Hooks/useAxiosComments";
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
  Spinner,
} from "@heroui/react";
import {
  FaComment,
  FaFlag,
  FaListUl,
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
import { Clock, Tags } from "lucide-react";
import Swal from "sweetalert2";
import { FaDeleteLeft } from "react-icons/fa6";

const SinglePost = () => {
  const params = useParams();
  const [posts] = useAxiosPosts();
  const [singleData, setSingleData] = useState([]);
  const [mergedData, refetch] = useAxiosMergeData();
  const [users] = useAxiosUsers();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setSingleData(mergedData.filter((item) => item._id === params.id));
  }, [mergedData]);

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

  const showInputModal = async (postData) => {
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

  return (
    <div className="mt-12">
      {singleData?.length > 0 ? (
        singleData.map((item) => (
          <Card className="py-4 w-fit mb-12">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <Image
                  alt="Card background"
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.author.profileImage}
                />
                <h1>{item.author.username}</h1>
              </div>

              <div className="text-start">
                <h4 className="font-bold text-large">{item.title}</h4>
                <p className="max-w-md">{item.description}</p>
              </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.image}
                // width={700}
              />
              <CardBody className="flex flex-row gap-5 justify-between">
                <div className="flex gap-5">
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
                    <FaThumbsDown className="text-red-400" />
                    {item.downVotes}
                  </Button>
                  <Button size="sm" variant="flat">
                    <FaComment className="text-green-400" />
                    {item.commentData.length}
                  </Button>
                  <Button size="sm" variant="flat">
                    <FaShare className="text-yellow-400" />
                    {item.commentData.length + 15}
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
              <CardBody className="flex gap-5  ">
                <div className="flex gap-3">
                  <Tags className="text-violet-500"></Tags>Tags:
                  {item.tags.map((item3, index) => (
                    <div key={index}>
                      <p> {item3}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="inline-flex">
                    <Clock className="text-blue-500 mr-3" /> Posted Data:{" "}
                    {item.createdAt}
                  </p>
                </div>
              </CardBody>
            </CardBody>
            {item.commentData.map((item2, index) => (
              <CardBody key={index} className="flex flex-row gap-5">
                <Image
                  alt="Card background"
                  className="object-cover rounded-full w-10 h-10"
                  src={users[item2.authorId]?.profileImage}
                />
                <p className="bg-slate-600 text-white p-3 rounded-2xl">
                  {item2?.text}
                </p>
              </CardBody>
            ))}
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
