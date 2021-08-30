import React from "react";
import { TYPES } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheck,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Alert = ({ message, type }) => {
  return (
    <div className={`w-full`}>
      <div
        className={` ${
          type === TYPES.SUCCESS
            ? "bg-green-200 text-green-700"
            : type === TYPES.ERROR
            ? "bg-red-200 text-red-700"
            : "bg-yellow-200 text-yellow-700"
        }  rounded-sm py-2 px-4 shadow-sm flex flex-row items-center`}
      >
        <div
          className={` ${
            type === TYPES.SUCCESS
              ? "bg-green-100 text-green-400"
              : type === TYPES.ERROR
              ? "bg-red-100 text-red-400"
              : "bg-yellow-100 text-yellow-400"
          }  py-1 px-2 rounded-full mr-4`}
        >
          <FontAwesomeIcon
            icon={
              type === TYPES.SUCCESS
                ? faCheck
                : TYPES.WARRNING === type
                ? faExclamationTriangle
                : faExclamationCircle
            }
          />
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
