import React, { useEffect } from "react";
import SideBar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-start">
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
