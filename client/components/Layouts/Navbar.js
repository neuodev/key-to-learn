import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const hideSidebar = () => {
    setShowSideBar(false);
  };
  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-xl ">
      <div>
        <img
          src="	https://www.dataquest.io/wp-content/uploads/2021/05/dq-logo-2.png"
          alt="Key To Learn"
        />
      </div>
      <button
        onClick={() => setShowSideBar(!showSideBar)}
        className="bg-black text-white px-2 py-1 rounded-sm overflow-hidden"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <SideBar showSideBar={showSideBar} hideSidebar={hideSidebar} />
    </div>
  );
};

export default Navbar;
