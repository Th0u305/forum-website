import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosComments from "../../Hooks/useAxiosComments";
import useAxiosPosts from "../../Hooks/useAxiosPosts";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
} from "@heroui/react";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Clock, Tags } from "lucide-react";

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

  console.log(singleData);

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
                width={700}
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
                  <p className="inline-flex"><Clock className="text-blue-500 mr-3"/> Posted Data: {item.createdAt}</p>
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
