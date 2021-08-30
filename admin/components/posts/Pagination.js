import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { TYPES } from "../../utils";

const Pagination = ({
  count,
  updateLimit,
  nextPage,
  prevPage,
  limit,
  page,
}) => {
  const [alert, setAlert] = useState("");

  const limitUpdate = (e) => {
    const newLimit = Number(e.target.value);
    if (isNaN(newLimit)) {
      setAlert("Please enter a valid limit");
      return;
    }

    updateLimit(newLimit);
  };
  return (
    <div className="grid grid-cols-12 gap-5 px-6">
      <div className="col-span-4">
        <p className="font-thin">
          Showing <span className="font-medium">{page * limit}</span> out of{" "}
          <span className="font-medium">{count}</span>
        </p>
      </div>
      <div className="col-span-4 flex items-center justify-center">
        <button
          onClick={nextPage}
          className="mr-4 text-gray-700 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p className="mr-4">
          Page {page} of {Math.ceil(count / limit)}
        </p>
        <button onClick={prevPage} className=" text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className="col-span-4 flex items-center justify-end">
        <input
          onChange={limitUpdate}
          value={limit}
          className="bg-gray-200 w-44 rounded-full pl-7 focus:outline-none"
          placeholder="Enter New Limit"
        />
        {alert && <p className="text-xs text-red-300">{alert}</p>}
      </div>
    </div>
  );
};

export default Pagination;
