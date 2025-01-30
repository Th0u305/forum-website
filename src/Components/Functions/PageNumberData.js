
const PageNumberData = (id, axiosPublic, setSearchData) => {
    axiosPublic
      .get(`/${import.meta.env.VITE_URL__8}?page=${id}`)
      .then((res) => {
        setSearchData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
};

export default PageNumberData;