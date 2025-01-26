
const PageNumberData = (id, axiosPublic, setSearchData) => {
    axiosPublic
      .get(`/mergedAllData?page=${id}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
};

export default PageNumberData;