import React, { useEffect, useRef, useState } from "react";
import { UPDATE_CODE_THEME } from "../../../actions/constants";
import { CODE_THEMES } from "./themes";
import { useSelector, useDispatch } from "react-redux";
const Customize = ({ showModel, hideModel }) => {
  const ref = useRef(null);
  const layoutState = useSelector((state) => state.layout);
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("dracula");
  const [layout, setLayout] = useState({
    showThemDropDown: false,
  });

  const closeThemDropDown = () => {
    setLayout({
      ...layout,
      showThemDropDown: false,
    });
  };

  const toggleThemDropDown = () => {
    setLayout({
      ...layout,
      showThemDropDown: !layout.showThemDropDown,
    });
  };

  const updateTheme = (newTheme) => {
    closeThemDropDown();

    dispatch({
      type: UPDATE_CODE_THEME,
      payload: newTheme,
    });

    setTheme(newTheme);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showModel && ref.current && !ref.current.contains(e.target)) {
        hideModel();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, hideModel]);
  return (
    <div
      ref={ref}
      className={` -top-12  z-50 p-4 py-8 rounded-lg shadow-2xl flex items-center flex-col border justify-center bg-gray-50 ${
        showModel ? "absolute" : "hidden"
      } w-10/12`}
    >
      <h1 className="text-lg font-meduim mb-4">Customize Code Blocks</h1>
      <div className="w-full">
        <div className="relative">
          <p className="text-gray-500 mr-2 font-medium text-xs  mb-1">Theme:</p>
          <p
            onClick={toggleThemDropDown}
            className="text-center w-full border tracking-wider rounded-sm py-1 cursor-pointer capitalize"
          >
            {theme}
          </p>
          {layout.showThemDropDown && (
            <ul className="h-56 overflow-y-scroll bg-white absolute top-14 w-full py-4 ">
              {Object.keys(CODE_THEMES).map((t) => (
                <li
                  onClick={() => updateTheme(t)}
                  className="py-1 text-gray-700 hover:bg-gray-100 capitalize px-4 cursor-pointer "
                  key={t}
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customize;
