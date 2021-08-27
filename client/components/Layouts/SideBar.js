import React, { useEffect, useRef } from "react";

const SideBar = ({ showSideBar, hideSidebar }) => {
  const ref = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showSideBar && ref.current && !ref.current.contains(e.target)) {
        hideSidebar();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showSideBar]);
  return (
    <div
      ref={ref}
      id="main-page-sidebar"
      className={`absolute top-0 right-0 w-72 shadow-xl bg-gray-50 h-screen transition-transform transform duration-200 ${
        showSideBar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      This should be the side bar
    </div>
  );
};

export default SideBar;
