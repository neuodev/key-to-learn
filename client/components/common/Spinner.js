import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="m-3 inline-block text-gray-600 text-2xl animate-spin ">
        <FontAwesomeIcon icon={faCircleNotch} />
      </span>
    </div>
  );
};

export default Spinner;
