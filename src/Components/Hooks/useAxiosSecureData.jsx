import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAxiosSecureData = () => {
    const axiosSecure = useAxiosSecure()

    const {data : users = [] , refetch} = useQuery({
        queryKey : ["users"], 
        queryFn : async () =>{
            const res = await axiosSecure.get("/getDataA") 
            return res.data
        }
    })
    return [users, refetch]
};

export default useAxiosSecureData;