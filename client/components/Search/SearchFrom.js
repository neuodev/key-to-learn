import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Filter from "./Filter";

const SearchFrom = ({ count, updateSearchText }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    updateSearchText(text);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-between h-11">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search titles or text"
          className="w-full py-3 px-4 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 bg-gray-100 rounded-md mr-3"
        />
        <button className="flex items-center justify-center bg-black text-white h-full rounded-md text-xs w-32">
          <FontAwesomeIcon icon={faSearch} className="mr-1" />
          <p>Search</p>
        </button>
      </div>
      <Filter postsCounts={count} />
    </form>
  );
};

export default SearchFrom;
