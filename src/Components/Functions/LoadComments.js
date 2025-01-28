import toast from "react-hot-toast";

const LoadComments = async (axiosPublic, id, setSearchData, setSingleData, params) => {
  await axiosPublic
    .get(`/mergedAllData?loadComment=${id}`)
    .then(async (res) => {
      if (res.data) {
        await setSearchData(res.data);
        setSingleData(res.data.filter((item) => item._id === params.id));
      }

      if (res?.data[0]?.commentData?.length === id) {
        return toast.error("No more comments left");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export default LoadComments;
