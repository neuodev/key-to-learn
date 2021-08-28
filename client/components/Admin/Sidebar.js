import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const join = "Join";

const MENU_ITEMS = [
  {
    title: "Create Post",
    path: "/admin/posts/create",
  },
  {
    title: "Update Post",
    path: "/admin/posts/update",
  },
  {
    title: "All Posts",
    path: "/admin/",
  },
];

const SideBar = ({}) => {
  return (
    <div id="admin-page-sidebar" className={`w-64 shadow-xl bg-white h-screen`}>
      <div className="w-full h-full p-4">
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
