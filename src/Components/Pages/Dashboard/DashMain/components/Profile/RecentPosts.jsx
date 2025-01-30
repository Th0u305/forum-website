import { useContext, useEffect, useState } from "react";
import SettingSection from "./SettingSection";
import { List } from "lucide-react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../../../Context/ContextProvider";
import { Card } from "@heroui/react";

const RecentPosts = () => {

  const { user } = useContext(AuthContext);
  const [postData, setPostData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/${import.meta.env.VITE_URL__31}/${user?.email}`)
      .then((res) => setPostData(res.data.slice(-3)));
  }, []);

  return (
    <SettingSection icon={List} title={"Recent Posts"}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {postData.length > 0 ? (
          postData.map((item, index) => (
            <Card key={index} className="bg-inherit p-5 w-fit border border-gray-600">
              <h4 className="font-bold text-large">Title: {item.title}</h4>
              <p className="max-w-xs text-ellipsis">Description: {item.description}</p>
            </Card>
          ))
        ) : (
          <div>
            <h4 className="font-bold text-large">You haven't wrote any post</h4>
          </div>
        )}
      </div>
    </SettingSection>
  );
};
export default RecentPosts;
