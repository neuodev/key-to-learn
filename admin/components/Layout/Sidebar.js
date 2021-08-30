import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { USER_SIGNIN_RESET } from "../../actions/constants";

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
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: USER_SIGNIN_RESET,
    });
  };
  return (
    <div
      id="admin-page-sidebar"
      className={`w-64 shadow-xl bg-white h-screen border-r`}
    >
      <div className="w-full h-full py-4">
        <div className="py-4 flex justify-between flex-col w-full h-full ">
          <ul className="px-2">
            {MENU_ITEMS.map((tab) => (
              <li
                key={tab.title}
                className="mb-1 font-thin text-lg text-left px-2 hover:bg-gray-200 rounded-md "
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
          <div className="px-2  justify-self-end align-bottom ">
            <button
              onClick={logout}
              className="bg-red-200 text-red-500 font-medium uppercase tracking-wider py-3 px-4 rounded-md w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
