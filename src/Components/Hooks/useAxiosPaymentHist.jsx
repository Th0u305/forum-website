import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"

const useAxiosPaymentHist =()=>{
    const axiosSecure = useAxiosSecure()
    const {data : history = [], refetch} = useQuery({
        queryKey : ["history"],
        queryFn :  async ()=>{
            const res = await axiosSecure.get('/paymentHistories')
            return res.data;
        }
    })
    return [history, refetch]
}

export default useAxiosPaymentHist