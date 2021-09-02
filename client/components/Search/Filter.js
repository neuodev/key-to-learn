import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end py-4">
        <button className="px-3 py-2 hover:bg-gray-200 bg-gray-100 rounded-md ">
          <FontAwesomeIcon icon={faSlidersH} />
        </button>
      </div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gray-50 rounded-md shadow-2xl border p-6">
        <h1 className="text-xl mb-4 font-semibold text-gray-700">
          Filter Settings
        </h1>
      </div>
    </div>
  );
};

export default Filter;
