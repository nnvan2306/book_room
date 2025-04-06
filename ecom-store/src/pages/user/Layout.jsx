import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/user/common/Header";
import Footer from "../../components/user/common/Footer";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
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
