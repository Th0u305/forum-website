import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCommentReport = () => {
    const axiosSecure = useAxiosSecure()
    const { data : reportCommentData = [],refetch} = useQuery({
        queryKey : ["commentReport"],
        queryFn : async ()=>{
            const res = await axiosSecure.get("/commentReport")
            return res.data;
        }
    })
    return [reportCommentData, refetch]
};
export default useCommentReport;