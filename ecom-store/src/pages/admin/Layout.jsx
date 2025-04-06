import React from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import FooterAdmin from "../../components/admin/common/Footer";
import HeaderAdmin from "../../components/admin/common/Header";
import SidebarMenuAdmin from "../../components/admin/common/SidebarMenu";

const Layout = () => {
  return (
    <>
      {/* TOP BAR */}
      <HeaderAdmin />
      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR MENU  */}
          <SidebarMenuAdmin />

          {/* MAIN CONTENT */}
          <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
            <Outlet />

            <FooterAdmin />
          </main>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <ToastContainer />
    </>
  );
};

export default Layout;
