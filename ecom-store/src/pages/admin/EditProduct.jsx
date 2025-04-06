import React, { useEffect, useState } from "react";
import ProductForm from "../../components/admin/form/ProductForm";
import { Link, useParams } from "react-router-dom";
import useCallApiNoPagination from "../../hooks/useCallApiNoPagination";
import { url } from "../../untils/variable";

const EditProduct = () => {
  // Lay id field can edit
  const { id } = useParams();

  // id -> GET Data
  const URL_DETAIL = url + `/${id}`;
  const { data, isLoading } = useCallApiNoPagination(URL_DETAIL);

  return (
    <>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Sửa Sản Phẩm</h1>
      </div>

      <div className="row my-4">
        <div className="col-lg-12 col-12">
          <div className="custom-block bg-white">
            <button className="px-4 bg-teal-500 text-white py-2 mb-3 rounded-xl">
              <Link to={"/dashboad/product/"}>Trả về</Link>
            </button>

            {isLoading && <p>Loading...</p>}
            {!isLoading && <ProductForm dataOld={data} URL_DETAIL={URL_DETAIL}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
