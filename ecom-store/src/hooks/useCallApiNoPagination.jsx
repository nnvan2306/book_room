import axios from "axios";
import { useEffect, useState } from "react";

const useCallApiNoPagination = (url, itemsPerPage = 5) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); //-> State để theo dõi trang hiện tại
  const [totalPages, setTotalPages] = useState(1); //-> State để lưu trữ tổng số trang

  console.log(currentPage);


  let params = `?_page=${currentPage}&_limit=${itemsPerPage}`;


  const getApi = async () => {
    try {
      // Du lieu dang duoc goi
      setIsLoading(true);
      const res = await axios.get(url + params);
      // Du lieu goi xong roi
      setData(res.data);
      setIsLoading(false);

      // Tinh tong so trang Page listing
      // console.log(res);
      let totalItems = parseInt(res.headers["x-total-count"]); //Tong SP trong db
      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      // console.log(totalItems);

    } catch (error) {
      console.log(error);
    }
  };



  // Call Api
  useEffect(() => {
    getApi();
  }, [url, currentPage]);


  // Logic Update Data when remove item -> Cap nhat lai gia tri data
  const removeItem = (id) => { //5
    const newData = data.filter((oldDta)=> {
      return oldDta.id !== id;
    })

    return setData(newData);
  }

  return { data, isLoading, removeItem, totalPages, currentPage, setCurrentPage };
}

export default useCallApiNoPagination;