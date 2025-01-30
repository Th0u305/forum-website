import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteComment = (user, id, index, post_id, axiosSecure,refetch,userFetch, commentRefetch) => {
  const data = {
    post_id: post_id,
    commentIndex: index,
  };

  if (!user && !user?.email) {
    toast.error("You're not logged in");
  }

  axiosSecure.delete(`/${import.meta.env.VITE_URL__23}/${id}`, { data }).then((res) => {
    if (res.data.result.deletedCount === 1 && res.data.pullResult) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      refetch()
      userFetch()
      commentRefetch()
    }
  });
};

export default DeleteComment;
