import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { TOGGLE_ADMIN_MODE } from "../../actions/constants";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);

  return (
    <div className="overflow-hidden relative w-full min-h-screen ">
      <Navbar />
      <div className={`${"max-w-screen-lg"} mx-auto h-full w-full`}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
