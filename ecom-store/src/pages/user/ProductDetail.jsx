import React from "react";
import ProductSection from "../../components/user/detail/ProductSection";
import ProductRelated from "../../components/user/detail/ProductRelated";
import { useParams } from "react-router-dom";
import { url } from "../../untils/variable";
import useCallApiNoPagination from "../../hooks/useCallApiNoPagination";

const ProductDetail = () => {
  
  // Call API DETAIL
  const param = useParams("id");
  const urlDetail = url + `/${param.id}`;

  const {data, isLoading} = useCallApiNoPagination(urlDetail);

  if(isLoading) return <p>Loading...</p>



  return (
    <>
      {/* Product section*/}
      <ProductSection data={data} />

      {/* Related items section*/}
      <ProductRelated/>
    </>
  );
};

export default ProductDetail;
