import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/ContextProvider";
import useAxiosSecureData from "../../../../../Hooks/useAxiosSecureData";
import { FaMedal } from "react-icons/fa";

const Profile = () => {
  const badgeColors = {
    Bronze: "text-[#cd7f32]", // Bronze color
    Gold: "text-[#ffd700]", // Gold color
    Platinum: "text-[#ff6363]", // Platinum color
  };

  const { user } = useContext(AuthContext);
  const [filterData, setFilterData] = useState([]);
  const [users, refetch] = useAxiosSecureData();

  useEffect(() => {
    const filterData = users?.users?.find((item) => item.email === user.email);
    setFilterData(filterData);
  }, [refetch()]);

  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src={
            user?.photoURL ||
            filterData?.profileImage ||
            "https://res.cloudinary.com/dmegxaayi/image/upload/v1737414981/d1peu0xv4p0v43sfpfmt.png"
          }
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />

        <div>
          <div className="flex gap-3 mt-6 w-fit mx-auto md:w-full md:mt-0">
            <h3 className="text-lg font-semibold text-gray-100">
              {user?.displayName || user?.username || filterData?.username}
            </h3>
            <p className="font-semibold inline-flex">
              {user && (
                <FaMedal
                  className={`${
                    badgeColors[filterData?.badge || "Bronze"] ||
                    "text-gray-500"
                  } text-2xl mr-4 mb-2`}
                ></FaMedal>
              )}
            </p>
          </div>

          <p className="text-gray-400">{user?.email || "example@gmail.com"}</p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};
export default Profile;
