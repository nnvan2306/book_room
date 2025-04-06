import React from "react";
import { Navigate } from "react-router-dom";

const IsAuth = ({ component }) => {
  let isAuth = JSON.parse(localStorage.getItem("USER_INFO"));

  return isAuth ? component : <Navigate to="/login" replace={true} />;
};

export default IsAuth;

// component -> <LayoutAdmin/>
