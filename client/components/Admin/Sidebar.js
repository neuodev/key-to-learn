import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const join = "Join";

const MENU_ITEMS = [
  {
    title: "Posts",
    path: "/admin/",
  },
  {
    title: "Categories & Tags",
    path: "/admin/categories",
  },
  {
    title: "Comments",
    path: "/admin/comments",
  },
];

const SideBar = ({}) => {
  return (
    <div id="admin-page-sidebar" className={`w-64 shadow-xl bg-white h-screen`}>
      <div className="w-full h-full py-4">
        <div className="my-4">
          <ul>
            {MENU_ITEMS.map((tab) => (
              <li
                key={tab.title}
                className="mb-1 font-thin text-lg text-left px-2 "
              >
                <Link href={tab.path}>
                  <p
                    className={` py-3 px-4 w-full inline-block cursor-pointer rounded-md ${
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
