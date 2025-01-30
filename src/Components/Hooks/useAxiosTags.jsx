import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useAxiosTags =()=>{
    const axiosPublic = useAxiosPublic()
    const {refetch, data : tags = []} = useQuery({
        queryKey : ["tags"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get(`/${import.meta.env.VITE_URL__4}`)
            return res.data;
        }
    })
    return [tags, refetch]
}

export default useAxiosTags