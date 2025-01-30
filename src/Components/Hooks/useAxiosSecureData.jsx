import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAxiosSecureData = () => {
    const axiosSecure = useAxiosSecure()

    const {data : users = [] , refetch} = useQuery({
        queryKey : ["users"], 
        queryFn : async () =>{
            const res = await axiosSecure.get(`/${import.meta.env.VITE_URL__11}`) 
            return res.data
        }
    })
    return [users, refetch]
};

export default useAxiosSecureData;