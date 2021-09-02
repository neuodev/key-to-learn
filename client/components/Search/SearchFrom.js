import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { searchPosts } from "../../actions/postsActions";
import { SEARCH_POSTS_RESET } from "../../actions/constants";
import { constractSearchParams } from "../../utils/posts";

const SearchFrom = () => {
  const [searchText, setSearchText] = useState("");
  const searchState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchPosts(constractSearchParams(searchText)));
    return () => {
      dispatch({
        type: SEARCH_POSTS_RESET,
      });
    };
  }, [searchText]);
  console.log(searchState);
  return (
    <div className="flex items-center justify-between h-11">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search titles or text"
        className="w-full py-3 px-4 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 bg-gray-100 rounded-md mr-3"
      />
      <button className="flex items-center justify-center bg-black text-white h-full rounded-md text-xs w-32">
        <FontAwesomeIcon icon={faSearch} className="mr-1" />
        <p>Search</p>
      </button>
    </div>
  );
};

export default SearchFrom;
