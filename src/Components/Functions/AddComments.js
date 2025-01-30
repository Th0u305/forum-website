import toast from 'react-hot-toast';

const AddComments = async (e, postId, users, user, comments, axiosSecure, refetch, setSearchData) => {
    e.preventDefault();

    if (!user && !user?.email) {
      return toast.error("You're not logged in")
    }

    const filterUser = await users?.find((item) => item?.email === user?.email);
    const comment = e.target.comment.value;

    const data = {
      id: comments.length + 1,
      postId: postId,
      authorEmail: filterUser.email,
      text: comment,
      createdAt: Date(),
      image: filterUser?.profileImage,
      name: filterUser?.username || user?.displayName,
    };

    axiosSecure.post(`/${import.meta.env.VITE_URL__30}`, { data }).then((res) => {
      if (res.data.addCommentsId.modifiedCount > 0) {
        toast.success("Successful");
        refetch();
        
        e.target.reset();
      }
    });
};

export default AddComments;