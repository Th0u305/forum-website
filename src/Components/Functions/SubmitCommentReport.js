import Swal from "sweetalert2";

const SubmitCommentReport = async (user, users, commentData, axiosSecure) => {
    
  if (!user && !user?.email) {
    return Swal.fire({
      title: "You're not logged in",
      icon: "warning",
    });
  }
  const { value: userInput } = await Swal.fire({
    title: "Enter Your Text",
    input: "textarea",
    inputPlaceholder: "Type your report...",
    html: `
            <div class="">
              <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
              <select id="reportOption"  class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" selected >Select a category option</option>
                <option value="Suicide or self-injury">Suicide or self-injury</option>
                <option value="Child abuse">Child abuse</option>
                <option value="Human trafficking">Human trafficking</option>
                <option value="Convicted sex offenders">Convicted sex offenders</option>
                <option value="False news">False news</option>
                <option value="Intellectual property infringement">Intellectual property infringement</option>
                <option value="Intellectual property infringement">Content from friends</option>
                <option value="DContent from groupsE">Content from groups</option>
                <option value="Public follower content">Public follower content</option>
                <option value="Unconnected content">Unconnected content</option>
              </select>
            </div>
          `,
    showCancelButton: true,
    confirmButtonText: "Submit",
    cancelButtonText: "Cancel",
    inputValidator: (value) => {
      const optionValue = document.getElementById("reportOption")?.value;

      if (!value) {
        return "You need to write something!";
      }
      if (optionValue.length === 0) {
        return "Please select and option";
      }
    },
  });

  const filterUser = users.find((item) => item.email === user.email);
  const optionValue = document.getElementById("reportOption")?.value;

  if (optionValue.length === 0 || !optionValue || optionValue.length === 0) {
    return;
  }

  const data = {
    reportCommentId : commentData.id,
    postId: commentData.postId,
    reportUserId: filterUser.id,
    reportDetails: userInput,
    reportOption: optionValue,
  };

  axiosSecure.post("/commentReport", {data}).then((res) => {
    // if (res.status === 200) {
    //   Swal.fire({
    //     title: "Your report has bean submitted",
    //     icon: "success",
    //   });
    // }
  });
};

export default SubmitCommentReport;
