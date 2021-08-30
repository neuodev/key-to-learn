import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
const UpdateCategory = ({ subcategory, category, show, hide }) => {
  const [newName, setNewName] = useState("");
  const ref = React.useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        hide();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, show]);
  return (
    <div
      ref={ref}
      className={` top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-1/2  p-4 rounded-lg shadow-lg flex items-center justify-center bg-white ${
        show ? "absolute" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="text-xl mb-4">
          Change{" "}
          <span className="font-medium">
            {category ? "Category" : "Subcatgory"}
          </span>{" "}
          From{" "}
          <span className="font-medium">
            {category}
            {subcategory}
          </span>
        </div>

        <div className="mb-4 text-gray-600 p-2 px-2.5 bg-gray-200 rounded-full">
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </div>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="mb-3 bg-gray-100 w-full rounded-lg p-4 focus:outline-none"
          placeholder={`Enter New ${
            category ? "Category" : "Subcategory"
          } Name`}
        />

        <button className="bg-blue-100 rounded-lg py-3 uppercase tracking-wider font-semibold text-blue-900 w-full">
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
