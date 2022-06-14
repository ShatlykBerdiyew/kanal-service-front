import React from "react";

export const Pagination = ({ pageCount, setSelectedPage, selectedPage }) => {
  const pagination = [];
  for (let i = 1; i <= pageCount; i++) {
    pagination.push(
      <span
        key={i}
        onClick={() => setSelectedPage(i)}
        className={selectedPage === i ? "active" : ""}
      >
        {i}
      </span>
    );
  }
  return <div className="pagination">{pagination.map((item) => item)}</div>;
};
