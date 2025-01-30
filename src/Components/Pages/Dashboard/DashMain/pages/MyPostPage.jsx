import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/ContextProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import PostTable from "../components/post/PostTable";
import { Helmet } from "react-helmet-async";

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/${import.meta.env.VITE_URL__31}/${user.email}`)
      .then((res) => setPostData(res.data));      
  }, []);

  return (
    <div className="flex-1 relative z-10 overflow-auto h-screen">
      <Header title={"My Posts"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div>
          <PostTable postData={postData}></PostTable>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-1/2 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {postData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full ">
                <CardBody className="overflow-visible">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-fit mx-auto">
                    <h4 className="font-bold text-large">{item.title}</h4>
                    <p className="max-w-md">{item.description}</p>
                  </CardHeader>

                  <CardBody className=" w-fit mx-auto">
                    {" "}
                    <Image
                      alt="image not available"
                      className="object-cover rounded-lg cursor-pointer"
                      src={item.image}
                      width={200}
                    />
                  </CardBody>
                  <CardBody className="flex flex-row gap-5 justify-center items-center">
                    <Button size="sm" variant="flat">
                      <FaThumbsUp className="text-blue-400" />
                      {item?.upVotes || 0}
                    </Button>
                    <Button size="sm" variant="flat">
                      <FaThumbsDown className="text-red-400" />
                      {item?.downVotes || 0}
                    </Button>
                    <Button size="sm" variant="flat">
                      <FaComment className="text-green-400" />
                    </Button>
                    <Button size="sm" variant="flat">
                      <FaShare className="text-yellow-400" />
                    </Button>
                  </CardBody>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};
export default MyPost;
