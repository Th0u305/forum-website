import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAxiosPosts =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch, data : posts = []} = useQuery({
        queryKey : ["posts"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get(`/${import.meta.env.VITE_URL__5}`)
            return res.data;
        }
    })
    return [posts, refetch]
}

export default useAxiosPosts