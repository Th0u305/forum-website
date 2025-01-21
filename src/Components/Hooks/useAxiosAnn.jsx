import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAxiosAnn = () => {
    const axiosPublic = useAxiosPublic()

    const {data : ann = [], refetch} = useQuery({
        queryKey : ["getAnn"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get('/getAnn')
            return res.data;
        }
    })
    return [ann, refetch]
};

export default useAxiosAnn;