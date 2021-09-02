import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";

const SearchFrom = ({}) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: {
        search: JSON.stringify({ text, fields: ["header", "body"] }),
      },
    });
  };
  return (
    <form onSubmit={onSubmit} className="my-4 mb-7 px-4">
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
    </form>
  );
};

export default SearchFrom;
