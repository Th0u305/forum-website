import axios from "axios"
const axiosCategory = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`
})

const useAxiosPublic = () =>{
    return axiosCategory
}

export default useAxiosPublic;