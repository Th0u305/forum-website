import useAxiosPublic from "./useAxiosPublic"
import {useQuery} from "@tanstack/react-query"

const useAxiosCategory = () =>{
    const axiosPublic = useAxiosPublic();
    const {refetch, data : category = []} = useQuery({
        queryKey : ["category"],
        queryFn: async () =>{
            const res = await axiosPublic.get("/category")
            return res.data;
        }
    })
    return [category,refetch]
}

export default useAxiosCategory;