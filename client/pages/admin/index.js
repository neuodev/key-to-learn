import React from "react";
import Sidebar from "../../components/Admin/Sidebar";

const Admin = () => {
  return (
    <div className="flex w-full h-full  min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="">Content</div>
    </div>
  );
};

export default Admin;
