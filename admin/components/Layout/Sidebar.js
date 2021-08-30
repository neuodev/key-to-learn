import React from "react";
import Link from "next/link";

const MENU_ITEMS = [
  {
    title: "Posts",
    path: "/",
  },
  {
    title: "Categories & Tags",
    path: "/categories",
  },
  {
    title: "Comments",
    path: "/comments",
  },
];

const SideBar = ({}) => {
  return (
    <div
      id="admin-page-sidebar"
      className={`w-64 shadow-xl bg-white h-screen border-r`}
    >
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
                    className={` py-3 px-4 w-full inline-block cursor-pointer rounded-md `}
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
