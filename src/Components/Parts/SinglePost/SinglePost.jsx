import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosComments from "../../Hooks/useAxiosComments";
import useAxiosPosts from "../../Hooks/useAxiosPosts";
import { Button, Card, CardBody, CardHeader, Image, Spinner } from "@nextui-org/react";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import useAxiosUsers from "../../Hooks/useAxiosUser";

const SinglePost = () => {
  const params = useParams();
  const [posts] = useAxiosPosts();
  const [singleData, setSingleData] = useState([]);
  const [mergedData] = useAxiosMergeData();
  const [users] = useAxiosUsers();

  useEffect(() => {
    setSingleData(mergedData.filter((item) => item._id === params.id));
  }, []);

  return (
    <div className="mt-12">
     {singleData.length > 0 ? ( <Card className="py-4 w-fit mb-12">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-5">
          <div className="flex items-center gap-2">
            <Image
              alt="Card background"
              className="rounded-full w-12 h-12 object-cover"
              src={mergedData[0]?.author.profileImage}
            />
            <h1>{mergedData[0]?.author.username}</h1>
          </div>

          <div className="text-start">
            <h4 className="font-bold text-large">{mergedData[0]?.title}</h4>
            <p className="max-w-md">{mergedData[0]?.description}</p>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl cursor-pointer"
            src={mergedData[0]?.image}
            width={700}
          />
          <CardBody className="flex flex-row gap-5">
            <Button size="sm" variant="flat">
              <FaThumbsUp />
            </Button>
            <Button size="sm" variant="flat">
              <FaThumbsDown />
            </Button>
            <Button size="sm" variant="flat">
              <FaComment />
              {mergedData[0]?.commentData.length}
            </Button>
            <Button size="sm" variant="flat">
              <FaShare />

              {mergedData[0]?.commentData.length + 15}
            </Button>
          </CardBody>
        </CardBody>
        {mergedData[0]?.commentData.map((item2, index) => (
          <CardBody key={index} className="flex flex-row gap-5">
            <Image
              alt="Card background"
              className="object-cover rounded-full w-10 h-10"
              src={users[item2.authorId]?.profileImage}
            />
            <p className="bg-gray-600 p-3 rounded-2xl">{item2?.text}</p>
          </CardBody>
        ))}
      </Card>)  : <div className="w-fit mx-auto mt-20">
            <Spinner size="lg" />
        </div>}
    </div>
  );
};

export default SinglePost;
