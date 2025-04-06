import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404 NotFound</h1>
      <h3>Return </h3> 
      <button>
        <Link to="/">Home Page</Link>
      </button>
    </>
  );
};

export default NotFound;
