import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAxiosMergeReport = () => {
    const axiosSecure = useAxiosSecure()
    const { data : reportData = [],refetch} = useQuery({
        queryKey : ["mergedReportData"],
        queryFn : async ()=>{
            const res = await axiosSecure.get(`/${import.meta.env.VITE_URL__24}`)
            return res.data;
        }
    })
    return [reportData, refetch]
};
export default useAxiosMergeReport;