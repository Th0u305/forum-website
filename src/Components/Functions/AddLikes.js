import toast from "react-hot-toast";


const AddLikes = (user, data, id, axiosSecure, refetch, userFetch, commentRefetch) => {

  if (!user && !user?.email) {
    return toast.error("You're not logged in");
  }

  const filter = {
    name: data,
    id: id,
  };

  axiosSecure.patch(`/${import.meta.env.VITE_URL__20}`, { filter }).then((res) => {
    if (res.data.modifiedCount > 0) {
      refetch();
      userFetch();
      commentRefetch();
    }
  });
};

export default AddLikes;
