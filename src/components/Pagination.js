import React from "react";
import "./index.css";
export default function Pagination({ currentPage, totalPages, onClick }) {
  return (
    <div>
      <span>Current Page : {currentPage}</span>
      <button
        className="button"
        onClick={() => onClick(Math.max(currentPage - 1, 1))}
      >
        previous
      </button>
      <button className="button" onClick={() => onClick(1)}>
        1
      </button>
      ..............
      <button className="button" onClick={() => onClick(totalPages)}>
        {totalPages}
      </button>
      <button
        className="button"
        onClick={() => onClick(Math.min(currentPage + 1, totalPages))}
      >
        next
      </button>
    </div>
  );
}
