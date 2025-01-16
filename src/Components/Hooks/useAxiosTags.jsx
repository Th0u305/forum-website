import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useAxiosTags =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch, data : tags = []} = useQuery({
        queryKey : ["tags"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get('/tags')
            return res.data;
        }
    })
    return [tags, refetch]
}

export default useAxiosTags