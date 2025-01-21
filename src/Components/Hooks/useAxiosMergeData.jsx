import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosMergeData = () => {
    const axiosPublic = useAxiosPublic()
    const { data : mergedData = [],refetch} = useQuery({
        queryKey : ["mergedAllData"],
        queryFn : async ()=>{
            const res = await axiosPublic.get("/mergedAllData")
            return res.data;
        }
    })
    return [mergedData, refetch]
};
export default useAxiosMergeData;