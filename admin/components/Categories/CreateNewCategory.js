import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../actions/categories";
import { TYPES } from "../../utils";
import Alert from "../common/Alert";
import Spinner from "../common/Spinner";

const CreateNewCategory = ({ subcategory, category, show, hide }) => {
  const [newName, setNewName] = useState("");
  const ref = React.useRef();
  const dispatch = useDispatch();
  const createCategoryState = useSelector((state) => state.createCategory);

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
    };
  }, [ref, show]);

  const create = () => {
    if (!newName) return;
    if (category && !subcategory) {
      dispatch(
        createCategory({
          name: newName,
        })
      );
    } else if (subcategory) {
      dispatch(
        createCategory({
          subcategory: newName,
          name: category,
        })
      );
    }
    setNewName("");
  };
  return (
    <div
      ref={ref}
      className={` top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-10/12 md:w-8/12 lg:w-1/2  p-4 py-10 rounded-lg shadow-lg flex items-center justify-center bg-white ${
        show ? "absolute" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-lg text-gray-600">
          Create New {category && !subcategory ? "Category" : "Subcategory"}
        </h1>
        {createCategoryState.loading ? (
          <div>
            <Spinner />
          </div>
        ) : createCategoryState.error ? (
          <div className="w-full mb-4">
            <Alert message={createCategoryState.error} type={TYPES.ERROR} />
          </div>
        ) : (
          createCategoryState.success && (
            <div>
              <Alert
                message={createCategoryState.success}
                type={TYPES.SUCCESS}
              />
            </div>
          )
        )}
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="mb-3 bg-gray-100 w-full rounded-lg p-4 focus:outline-none"
          placeholder={`Enter New ${
            category ? "Category" : "Subcategory"
          } Name`}
        />

        <button
          onClick={create}
          className="bg-blue-100 rounded-lg py-3 uppercase tracking-wider font-semibold text-blue-900 w-full"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateNewCategory;
