import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Context/ContextProvider';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useContext(AuthContext);
    const {data : isAdmin, isPending : isAdminLoading} = useQuery({
        queryKey : [user?.email, "isAdmin"],
        enabled : !loading,
        queryFn : async () =>{
            const res = await axiosSecure.get(`${import.meta.env.VITE_AUTH_VALIDATION}/${user?.email}`);
            return res.data            
        }
    })
    return[isAdmin, isAdminLoading]
    
};

export default useAdmin;