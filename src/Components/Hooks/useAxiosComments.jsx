import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useAxiosComments =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch : commentRefetch, data : comments = []} = useQuery({
        queryKey : ["comments"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get(`/${import.meta.env.VITE_URL__7}`)
            return res.data;
        }
    })
    return [comments, commentRefetch]
}

export default useAxiosComments