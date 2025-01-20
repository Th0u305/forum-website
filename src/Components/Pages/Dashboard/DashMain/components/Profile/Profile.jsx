import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../Context/ContextProvider";
import useAxiosSecureData from "../../../../../Hooks/useAxiosSecureData";

const Profile = () => {
	const {user} = useContext(AuthContext);
	 const [filterData, setFilterData] = useState([])
	 const [users, refetch] = useAxiosSecureData()
	 useEffect(()=>{
		const filterData = (users?.users?.find(item => item.email === user.email));
		setFilterData(filterData)
	  },[refetch()])
	
	return (
		<SettingSection icon={User} title={"Profile"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src={user?.photoURL || user?.profileImage || filterData?.profileImage}
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>

				<div>
					<h3 className='text-lg font-semibold text-gray-100'>{user?.displayName || user?.username || filterData?.username}</h3>
					<p className='text-gray-400'>{user?.email}</p>
				</div>
			</div>

			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Edit Profile
			</button>
		</SettingSection>
	);
};
export default Profile;
