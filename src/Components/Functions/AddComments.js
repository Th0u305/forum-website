import toast from 'react-hot-toast';

const AddComments = async (e, postId, users, user, comments, axiosSecure, refetch, setSearchData) => {
    e.preventDefault();

    const filterUser = await users?.find((item) => item?.email === user?.email);
    const comment = e.target.comment.value;

    const data = {
      id: comments.length + 1,
      postId: postId,
      authorId: filterUser.id,
      text: comment,
      createdAt: Date(),
      image: filterUser?.profileImage,
      name: filterUser?.username || user?.displayName,
    };

    axiosSecure.post("/addComments", { data }).then((res) => {
      if (res.data.addCommentsId.modifiedCount > 0) {
        toast.success("Successful");
        refetch();
        setSearchData([]);
        e.target.reset();
      }
    });
};

export default AddComments;