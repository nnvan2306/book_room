import React from "react";
import { Link } from "react-router-dom";
import ProductForm from "../../components/admin/form/ProductForm";

const CreateProduct = () => {
  return (
    <>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Thêm Mới</h1>
      </div>

      <div className="row my-4">
        <div className="col-lg-12 col-12">
          <div className="custom-block bg-white">
            <button className="px-4 bg-teal-500 text-white py-2 mb-3 rounded-xl">
              <Link to={"/dashboad/product/"}>Trả về</Link>
            </button>

            <ProductForm/>

          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
