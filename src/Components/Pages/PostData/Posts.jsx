import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
  user,
} from "@heroui/react";
import useAxiosPosts from "../../Hooks/useAxiosPosts";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import useAxiosComments from "../../Hooks/useAxiosComments";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import { useContext } from "react";
import { DataContextProvider } from "../../Context/DataContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { m } from "framer-motion";

const Posts = () => {
  const [posts] = useAxiosPosts();
  const [users] = useAxiosUsers();
  const [comments] = useAxiosComments();
  const [mergedData, refetch] = useAxiosMergeData();
  const { latest } = useContext(DataContextProvider);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    refetch();
  }, [mergedData]);
  // Front end merged Data

  // const mergedData = posts
  //   .map((post) => ({
  //     ...post,
  //     author: users.find((user) => user.id === post.authorId),
  //     comment: comments.filter((comment) => comment.authorId === post.authorId),
  //   }))
  //   .sort(() => Math.random() - 0.5);
  // console.log(mergedData);

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
        refetch()
      }
    });
  };

  return (
    <div className="w-fit mx-auto">
      {mergedData?.length > 0 ? (
        mergedData.map((item, index) => (
          <Card className="py-4 w-fit mb-12" key={index}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
              <div className="flex items-center gap-2">
                <Image
                  alt="Card background"
                  className="rounded-full w-12 h-12 object-cover"
                  src={item.author?.profileImage}
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
                onClick={() => navigate(`/post/${item._id}`)}
                className="object-cover rounded-xl cursor-pointer"
                src={item?.image}
              />
              <CardBody className="flex flex-row gap-5">
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
                <Button size="sm" variant="flat">
                  <FaShare className="text-yellow-400" />
                  {item.commentData.length + 15}
                </Button>
              </CardBody>
            </CardBody>
            {item.commentData.map((item2, index) => (
              <CardBody key={index} className="flex flex-row gap-5">
                <Image
                  alt="Card background"
                  className="object-cover rounded-full w-10 h-10"
                  src={users[item2.authorId]?.profileImage}
                />
                <p className="bg-slate-600 text-white p-3 rounded-2xl max-w-md">
                  {item2.text}
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

export default Posts;
