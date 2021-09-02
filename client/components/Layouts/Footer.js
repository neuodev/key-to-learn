import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-lg text-gray-50 py-10 w-full text-center">
      <h1>
        Key To Learn
        <span className="mx-1">
          <FontAwesomeIcon icon={faCopyright} />
        </span>
        <span>2021</span>
      </h1>
    </div>
  );
};

export default Footer;
