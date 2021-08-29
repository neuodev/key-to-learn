import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { USER_SIGNIN_RESET } from "../../actions/constants";
const join = "Join";

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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: USER_SIGNIN_RESET,
    });
  };
  const MENU_ITEMS = [
    {
      title: "Web Development",
      path: "/web-development",
      show: true,
    },
    {
      title: "Machine learning",
      path: "/machine-learning",
      show: true,
    },
    {
      title: "Data Science",
      path: "/data-science",
      show: true,
    },
    {
      title: "Search",
      path: "/search",
      show: true,
    },
    {
      title: "Admin",
      path: "/admin",
      show: user && user.userInfo && user.userInfo.isAdmin,
    },
    {
      title: join,
      path: "/join",
      show: true,
    },
    {
      title: "Sign In",
      path: "/sign-in",
      show: !user || !user.userInfo,
    },
    {
      title: "Logout",
      type: "button",
      onClick: logout,
      show: user && user.userInfo,
    },
  ];

  const [menuList, setMenuList] = useState(MENU_ITEMS);
  return (
    <div
      ref={ref}
      id="main-page-sidebar"
      className={`absolute z-50 top-0 right-0 w-96 shadow-xl bg-gray-50 h-screen transition-transform transform duration-300 ${
        showSideBar ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full h-full p-4">
        <button
          onClick={hideSidebar}
          className="inline-block bg-black text-white px-2 rounded-sm shadow-xl"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="my-4">
          <ul>
            {MENU_ITEMS.map((tab) => {
              if (!tab.show) return;
              if (tab.type === "button") {
                if (tab.title === "Logout") {
                  return (
                    <button
                      className={` py-3 w-full inline-block cursor-pointer rounded-md 
                      bg-red-300 text-red-900 hover:bg-red-200 mb-2 transition-colors duration-300
                      `}
                      key={tab.title}
                      onClick={() => {
                        tab.onClick();
                        hideSidebar();
                      }}
                    >
                      {tab.title}
                    </button>
                  );
                }
                return (
                  <button key={tab.title} onClick={tab.onClick}>
                    {tab.title}
                  </button>
                );
              }
              if (tab.path) {
                return (
                  <li
                    onClick={hideSidebar}
                    key={tab.title}
                    className=" font-medium text-lg text-center mb-2"
                  >
                    <Link href={tab.path}>
                      <p
                        className={` transition-colors duration-200 py-3 w-full inline-block cursor-pointer rounded-md ${
                          tab.title === join
                            ? "bg-blue-300 text-blue-900 hover:bg-blue-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {tab.title}
                      </p>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
