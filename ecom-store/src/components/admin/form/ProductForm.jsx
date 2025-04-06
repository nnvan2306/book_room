import React, { useState } from "react";
import ProductLabel from "./ProductLabel";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../../../untils/variable";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const classInput = `block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`;

const ProductForm = ({ dataOld, URL_DETAIL }) => {
  // console.log(dataOld);

  const [isLoading, setIsLoading] = useState(false);

  const redirect = useNavigate();

  // Khai bao react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: dataOld ? dataOld.title : "",
      category: dataOld ? dataOld.category : "",
      image: dataOld ? dataOld.image : "",
      price: dataOld ? dataOld.price : "",
      content: dataOld ? dataOld.content : "",
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {

      if (!dataOld) {
        // Tao moi san pham
        setIsLoading(true);
        await axios.post(url, data);
        setIsLoading(false);

        toast.success("Them san pham thanh cong", {
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
      }

      if(dataOld) {
        // Edit san pham
        setIsLoading(true);
        await axios.patch(URL_DETAIL, data);
        setIsLoading(false);

        toast.success("Edit san pham thanh cong", {
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
      }

      // Chuyen huong ve trang listing
      setTimeout(() => {
        redirect("/dashboad/product/");
      }, 1500);
    } catch (error) {
      setIsLoading(false);

      if(!dataOld) {
        toast.error('Thêm mới không thành công!', {
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
      }
      if(dataOld) {
        toast.error('Edit không thành công!', {
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
      }

      throw new error();
    }
  };

  return (
    <form
      className="max-w-full mx-auto my-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="title"
          id="floating_email"
          className={classInput}
          placeholder=" "
          {...register("title", { required: true })}
        />
        <ProductLabel htmlFor="floating_email" name="Title" required={true} />
        {errors.title && (
          <span className="text-[#FF0000] text-sm">
            Trường dữ liệu không được để trống!
          </span>
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="category"
          id="floating_password"
          className={classInput}
          placeholder=" "
          {...register("category")}
        />
        <ProductLabel htmlFor="floating_password" name="Category" />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          disabled={dataOld ? true : false}
          type="text"
          name="image"
          id="floating_repeat_password"
          className={classInput}
          placeholder=" "
          {...register("image", { required: true })}
        />
        <ProductLabel
          htmlFor="floating_repeat_password"
          name="Image"
          required={true}
        />
        {errors.image && (
          <span className="text-[#FF0000] text-sm">
            Trường dữ liệu không được để trống!
          </span>
        )}
      </div>
      <div className="grid md:grid-cols-1 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="price"
            id="floating_first_name"
            className={classInput}
            placeholder=" "
            required=""
            {...register("price", { required: true })}
          />

          <ProductLabel
            htmlFor="floating_first_name"
            name="Price"
            required={true}
          />
          {errors.price && (
            <span className="text-[#FF0000] text-sm">
              Trường dữ liệu không được để trống!
            </span>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Product Content <span className="text-[#FF0000]">*</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Content Product..."
            name="content"
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && (
            <span className="text-[#FF0000] text-sm">
              Trường dữ liệu không được để trống!
            </span>
          )}
        </div>
      </div>
      <button
        disabled={isLoading ? true : false}
        type="submit"
        className={`text-white ${
          isLoading ? "bg-dark" : "bg-blue-700"
        } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
      >
        Save change
      </button>
    </form>
  );
};

export default ProductForm;

// data: bao gom tat du lieu nguoi dung nhap vao (Phai dang ky truoc bang register voi hook form)
// console.log("Gia tri nguoi dung nhap", data);
