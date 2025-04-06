import axios from "axios";
import React, { useState } from "react";
import { url } from "../../../untils/variable";
import { Bounce, toast } from "react-toastify";

const DeleteButtonDashboad = ({ id, removeItem }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDetele = () => {
    const deleteProduct = async () => {
      try {
        setIsLoading(true); //Chuan bi xoa
        const response = await axios.delete(url + "/" + id);
        console.log(response);
        setIsLoading(false); // Xoa xong r

        // Cap nhat du lieu data listing
        removeItem(id);


        toast.success('Xoa Thanh Cong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });

      } catch (error) {
        setIsLoading(false);

        toast.error('Xoa That Bai', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
          
        throw new error();
      }
    };
    deleteProduct();
  };

  return (
    <button
      disabled={isLoading ? true : false}
      type="button"
      className={`text-white ${
        isLoading ? "bg-black" : "bg-gradient-to-r"
      } from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-1 text-center`}
      onClick={handleDetele}
    >
      Delete
    </button>
  );
};

export default DeleteButtonDashboad;
