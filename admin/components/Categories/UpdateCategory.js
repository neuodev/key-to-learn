import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from "../../actions/categories";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { TYPES } from "../../utils";
import { UPDATE_CATEGORIES_RESET } from "../../actions/constants";

const UpdateCategory = ({ subcategory, category, show, hide, id }) => {
  const [newName, setNewName] = useState("");
  const ref = React.useRef();
  const dispatch = useDispatch();
  const updateCategoryState = useSelector((state) => state.updateCategory);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        hide();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
      setNewName("");
      dispatch({
        type: UPDATE_CATEGORIES_RESET,
      });
    };
  }, [ref, show]);
  const update = () => {
    if (!newName) return;
    if (category && !subcategory) {
      dispatch(
        updateCategory(id, {
          newName,
        })
      );
    } else if (subcategory) {
      dispatch(
        createCategory(id, {
          oldSubcategoryName: subcategory,
          newSubcategory: newName,
        })
      );
    }
    setNewName("");
  };
  return (
    <div
      ref={ref}
      className={` top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-1/2  p-4 rounded-lg shadow-lg flex items-center justify-center bg-white ${
        show ? "absolute" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-4 bg-blue-100 px-3 py-2 rounded-full text-blue-900 ">
          Create New {subcategory ? "Subcategory" : "Category"}
        </h1>
        {updateCategoryState.loading ? (
          <div>
            <Spinner />
          </div>
        ) : updateCategoryState.error ? (
          <div className="w-full mb-4">
            <Alert message={updateCategoryState.error} type={TYPES.ERROR} />
          </div>
        ) : (
          updateCategoryState.success && (
            <div>
              <Alert
                message={updateCategoryState.success}
                type={TYPES.SUCCESS}
              />
            </div>
          )
        )}
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

        <button
          onClick={update}
          className="bg-blue-100 rounded-lg py-3 uppercase tracking-wider font-semibold text-blue-900 w-full"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateCategory;
