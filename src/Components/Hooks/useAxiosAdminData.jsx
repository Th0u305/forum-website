import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAxiosAdminData = () => {
    
    const axiosSecure = useAxiosSecure()

    const {data : users = [] , refetch} = useQuery({
        queryKey : ["users"],
        queryFn : async () =>{
            const res = await axiosSecure.get("/getDataAdmin") 
            return res.data
        }
    })
    return [users, refetch]
};

export default useAxiosAdminData;