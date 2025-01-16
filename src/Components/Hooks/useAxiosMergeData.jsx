import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAxiosMergeData = () => {
    const axiosPublic = useAxiosPublic()
    const {refetch, data : mergedData = []} = useQuery({
        queryKey : ["mergedAllData"],
        queryFn : async ()=>{
            const res = await axiosPublic.get("/mergedAllData")
            return res.data;
        }
    })
    return [mergedData, refetch]
};
export default useAxiosMergeData;