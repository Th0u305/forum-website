import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosUsers =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch : userFetch , data : users = []} = useQuery({
        queryKey : ["users"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get(`/${import.meta.env.VITE_URL__6}`)
            return res.data;
        }
    })
    return [users, userFetch]
}

export default useAxiosUsers