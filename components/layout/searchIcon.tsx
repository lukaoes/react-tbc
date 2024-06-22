"use client";
import { useState } from "react";
import Search from "./search";

const SearchIcon = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const handleClose = () => {
    setOpenSearch(false);
  };
  return (
    <>
      {openSearch && (
        <div
          className="open-filter-bg"
          onClick={() => setOpenSearch(false)}
        ></div>
      )}

      <div>
        <svg
          onClick={() => setOpenSearch(true)}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="cursor-pointer"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 17.5L13.875 13.875"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div
          className={`search-header-container ${openSearch ? "active" : ""}`}
        >
          <Search handleClose={handleClose} />
        </div>
      </div>
    </>
  );
};

export default SearchIcon;