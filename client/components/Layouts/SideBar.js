import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const join = "Join";

const MENU_ITEMS = [
  {
    title: "Web Development",
    path: "/web-development",
  },
  {
    title: "Machine learning",
    path: "/machine-learning",
  },
  {
    title: "Data Science",
    path: "/data-science",
  },
  {
    title: "Search",
    path: "/search",
  },
  ,
  {
    title: join,
    path: "/join",
  },
  ,
  {
    title: "Sign In",
    path: "/sign-in",
  },
];

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
      className={`absolute top-0 right-0 w-96 shadow-xl bg-gray-50 h-screen transition-transform transform duration-300 ${
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
            {MENU_ITEMS.map((tab) => (
              <li
                key={tab.title}
                className="mb-1 font-medium text-lg text-center "
              >
                <Link href={tab.path}>
                  <p
                    className={` py-3 w-full inline-block cursor-pointer rounded-md ${
                      tab.title === join
                        ? "bg-blue-300 text-blue-900 hover:bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tab.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
