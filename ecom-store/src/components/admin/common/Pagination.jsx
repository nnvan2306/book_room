import React from "react";

const PaginationDashboard = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center mb-0">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">Prev</span>
          </button>
        </li>

        {pageNumbers.map((value) => (
          <li
            className={`page-item ${value === currentPage ? "active" : ""}`}
            key={value}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(value)}
            >
              {value}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationDashboard;
