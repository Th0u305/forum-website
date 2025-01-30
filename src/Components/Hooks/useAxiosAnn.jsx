import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAxiosAnn = () => {
    const axiosPublic = useAxiosPublic()

    const {data : ann = [], refetch} = useQuery({
        queryKey : ["getAnn"],
        queryFn :  async ()=>{
            const res = await axiosPublic.get(`/${import.meta.env.VITE_URL__19}`)
            return res.data;
        }
    })
    return [ann, refetch]
};

export default useAxiosAnn;