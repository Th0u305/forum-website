import ProductsTable from "../components/products/ProductsTable";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/ContextProvider";
import useAxiosSecureData from "../../../../Hooks/useAxiosSecureData";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { FaComment, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Announcement = () => {
  const { user } = useContext(AuthContext);
  const [users, refetch] = useAxiosSecureData();
  const [postData, setPostData] = useState([]);
  const axiosSecure = useAxiosSecure();

  axiosSecure.get(`/myPost/${user.email}`).then((res) => setPostData(res.data));

  return (
    <div className="flex-1 relative z-10 overflow-auto">
    <Header title={"Announcement"} />

    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 h-screen">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 h-full gap-5"
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
            <Card className="h-full">
              <CardBody className="overflow-visible">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{item.title}</h4>
                  <p className="max-w-md">{item.description}</p>
                </CardHeader>

                <CardBody>
                  {" "}
                  <Image
                    alt="image not available"
                    className="object-cover rounded-xl cursor-pointer"
                    src={item.image}
                    width={700}
                  />
                </CardBody>
                <CardBody className="flex flex-row gap-5 justify-center items-center">
                  <Button size="sm" variant="flat">
                    <FaThumbsUp className="text-blue-400" />
                  </Button>
                  <Button size="sm" variant="flat">
                    <FaThumbsDown className="text-red-400" />
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
export default Announcement;
