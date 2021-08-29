import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { TOGGLE_ADMIN_MODE } from "../../actions/constants";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layout);
  useEffect(() => {
    //@todo Update to check the if the login user is admin or not
    if (/admin/g.test(router.asPath)) {
      dispatch({
        type: TOGGLE_ADMIN_MODE,
        payload: true,
      });
    } else {
      dispatch({
        type: TOGGLE_ADMIN_MODE,
        payload: false,
      });
    }
  }, [router]);
  return (
    <div className="overflow-hidden relative w-full min-h-screen ">
      <Navbar />
      <div
        className={`${
          !layout.isAdmin && "max-w-screen-lg"
        } mx-auto h-full w-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
