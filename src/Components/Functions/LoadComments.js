import toast from 'react-hot-toast';

const LoadComments = async (axiosPublic , id , setSearchData) => {
    
    await axiosPublic
    .get(`/mergedAllData?loadComment=${id}`)
    .then((res) => {
      setSearchData(res.data);
      if (res?.data[0]?.commentData?.length === id) {
        toast.error("No more comments left");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default LoadComments;