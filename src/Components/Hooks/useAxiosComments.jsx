import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useAxiosComments =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch : commentRefetch, data : comments = []} = useQuery({
        queryKey : ["comments"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get('/comments')
            return res.data;
        }
    })
    return [comments, commentRefetch]
}

export default useAxiosComments