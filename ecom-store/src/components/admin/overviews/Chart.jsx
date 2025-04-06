import React from "react";

const ChartAdmin = () => {
  return (
    <>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Overview</h1>
        <small className="text-muted">Hello Thomas, welcome back!</small>
      </div>
      <div className="row my-4">
        <div className="col-lg-12 col-12">
          <div className="custom-block bg-white">
            <h5 className="mb-4">History</h5>
            <div id="pie-chart" />
          </div>
        </div>
        <div className="col-lg-12 col-12">
          <div className="custom-block bg-white">
            <div id="chart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartAdmin;
