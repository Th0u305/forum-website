import React, { useEffect, useState } from "react";
import useAxiosMergeData from "../../Hooks/useAxiosMergeData";
import useAxiosUsers from "../../Hooks/useAxiosUser";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
  user,
} from "@heroui/react";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

const TopPosts = () => {
  const [mergedData = limitData] = useAxiosMergeData();
  const [users] = useAxiosUsers();

  const limitData = mergedData.slice(0, 5);
  return (
    <div className="mt-12">
      {limitData?.length > 0 ? (
        limitData.map((item, index) => (
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
                width={700}
              />
              <CardBody className="flex flex-row gap-5">
                <Button size="sm" variant="flat">
                  <FaThumbsUp className="text-blue-400" />
                  {item.upVotes}
                </Button>
                <Button size="sm" variant="flat">
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
            </CardBody>
            {item.commentData.map((item2, index) => (
              <CardBody key={index} className="flex flex-row gap-5">
                <Image
                  alt="Card background"
                  className="object-cover rounded-full w-10 h-10"
                  src={users[item2.authorId]?.profileImage}
                />
                <p className="bg-gray-600 p-3 rounded-2xl">{item2.text}</p>
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

export default TopPosts;
