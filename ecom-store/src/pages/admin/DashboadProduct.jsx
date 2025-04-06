import React from "react";
import PaginationDashboad from "../../components/admin/common/Pagination";
import TheadDashboad from "../../components/admin/table/Thead";
import TbodyDashboad from "../../components/admin/table/Tbody";
import useCallApiNoPagination from "../../hooks/useCallApiNoPagination";
import { url } from "../../untils/variable";
import { Link } from "react-router-dom";

const DashboadProduct = () => {
  // Do du lieu
  const {
    data,
    isLoading,
    removeItem,
    totalPages,
    currentPage,
    setCurrentPage,
  } = useCallApiNoPagination(url);

  return (
    <>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Danh Sách Sản Phẩm</h1>
      </div>
      <div className="row my-4">
        <div className="col-lg-12 col-12">
          <div className="custom-block bg-white">
            <button className="px-4 bg-teal-500 text-white py-2 mb-3 rounded-xl">
              <Link to={"/dashboad/product/add"}>Them Moi</Link>
            </button>

            <div className="table-responsive">
              <table className="account-table table">
                <TheadDashboad />
                {isLoading && (
                  <tbody>
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center bg-white py-3 text-[12px]"
                      >
                        Du lieu dang duoc tai...
                      </td>
                    </tr>
                  </tbody>
                )}
                {!isLoading && (
                  <TbodyDashboad data={data} removeItem={removeItem} />
                )}
              </table>
            </div>
            <PaginationDashboad
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboadProduct;
