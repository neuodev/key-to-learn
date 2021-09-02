import React from "react";
import SearchFrom from "../components/Search/SearchFrom";
import { useSelector, useDispatch } from "react-redux";

const Search = () => {
  const { posts, loading, error, count } = useSelector((state) => state.search);
  return (
    <div className="mt-4 p-4">
      <SearchFrom />
      <div>
        <pre>{JSON.stringify(posts, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Search;
