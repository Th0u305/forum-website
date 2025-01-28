import toast from "react-hot-toast";

const DeleteComment = (user, id, index, post_id, axiosSecure) => {
  const data = {
    post_id: post_id,
    commentIndex: index,
  };

  if (!user && !user?.email) {
    toast.error("You're not logged in");
  }

  axiosSecure.delete(`/deleteComment/${id}`, { data }).then((res) => {
    if (res.data.result.deletedCount === 1 && res.data.pullResult) {
      return toast.success("Deleted comment successfully");
    }
  });
};

export default DeleteComment;
