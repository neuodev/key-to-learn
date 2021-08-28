import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCode } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
import Link from "next/link";

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const hideSidebar = () => {
    setShowSideBar(false);
  };
  return (
    <div className=" px-4 py-3 shadow-xl ">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div>
          <Link href="/">
            <div className="flex items-center justify-start">
              <div className="inline-block mr-2 bg-gray-900 text-white py-1 px-1.5 rounded-full">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <p className="font-medium text-gray-800 uppercase tracking-wider text-lg">
                Key To Learn
              </p>
            </div>
          </Link>
        </div>
        <button
          onClick={() => setShowSideBar(!showSideBar)}
          className="bg-black text-white px-2 py-1 rounded-sm overflow-hidden"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <SideBar showSideBar={showSideBar} hideSidebar={hideSidebar} />
      </div>
    </div>
  );
};

export default Navbar;
