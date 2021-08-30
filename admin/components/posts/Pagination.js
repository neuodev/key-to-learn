import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  count,
  updateLimit,
  nextPage,
  prevPage,
  limit,
  page,
}) => {
  const [alert, setAlert] = useState("");
  const [newLimit, setNewLimit] = useState(10);
  const limitUpdate = (e) => {
    e.preventDefault();
    if (isNaN(Number(newLimit))) {
      setAlert("Please enter a valid limit");
      return;
    }

    updateLimit(Number(newLimit));
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
          onClick={prevPage}
          className="mr-4 text-gray-700 cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <p className="mr-4">
          Page {page} of {Math.ceil(count / limit)}
        </p>
        <button onClick={nextPage} className=" text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <form
        onSubmit={limitUpdate}
        className="col-span-4 flex items-center justify-end"
      >
        <div className="flex w-full items-end flex-col text-center justify-end">
          <div className="flex w-full  justify-end items-center ">
            <input
              onChange={(e) => setNewLimit(e.target.value)}
              value={newLimit}
              className="bg-gray-200 w-44 rounded-full pl-7 focus:outline-none"
              placeholder="Enter New Limit"
            />
            <button>
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </button>
          </div>
          {alert && (
            <p className="text-xs text-red-300 w-full text-right mt-1 ">
              {alert}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Pagination;
