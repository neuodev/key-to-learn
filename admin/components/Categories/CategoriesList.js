import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import UpdateCategory from "./UpdateCategory";
import CreateNewCategory from "./CreateNewCategory";

const CategoriesList = ({ categories }) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(false);
  const [catId, setCatId] = useState(null);
  const hideDialog = () => {
    setShowUpdateDialog(false);
    setShowCreateDialog(false);
  };

  const updateCategory = (c) => {
    setCategory(c.name);
    setSubcategory("");
    setShowUpdateDialog(true);
    setCatId(c._id);
  };

  const updateSubCategory = (catName, catId, subName) => {
    setCategory(catName);
    setSubcategory(subName);
    setShowUpdateDialog(true);
    setCatId(catId);
  };
  return (
    <div className="mt-9">
      {categories.map((cat) => (
        <div className="mb-10" key={cat._id}>
          <div className="inline-block">
            <div
              onClick={() => updateCategory(cat)}
              className="text-gray-700 hover:text-blue-500 hover:underline flex items-center justify-start"
            >
              <p className="cursor-pointer  mr-2 text-3xl ">{cat.name}</p>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-4">
            {cat.subcategories.map((sub) => (
              <p className="mr-4 p-4 col-span-3 flex items-center justify-between bg-blue-100 border border-blue-500 rounded-full text-blue-600 font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-150">
                <span
                  onClick={() => updateSubCategory(cat.name, cat._id, sub)}
                  className="mr-2 inline-block truncate"
                >
                  {sub}
                </span>
                <button className="bg-blue-300 flex items-center justify-center  text-xs p-1 px-2 rounded-full hover:bg-blue-400">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </p>
            ))}
            <button
              className=""
              onClick={() => {
                setShowCreateDialog(true);
                setSubcategory(true);
                setCategory(cat.name);
              }}
            >
              <p className="mr-4 p-4 px-8 flex items-center justify-center bg-blue-100 border border-blue-500 rounded-full text-blue-600 font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-150">
                <FontAwesomeIcon icon={faPlus} />
              </p>
            </button>
          </div>
        </div>
      ))}
      <button
        className=""
        onClick={() => {
          setShowCreateDialog(true);
          setSubcategory("");
          setCategory(true);
        }}
      >
        <p className="mr-4 p-4 px-8 bg-blue-100 border border-blue-500 rounded-full text-blue-600 font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-150">
          NEW CATEGORY <FontAwesomeIcon icon={faPlus} />
        </p>
      </button>

      <UpdateCategory
        show={showUpdateDialog}
        hide={hideDialog}
        category={category}
        subcategory={subcategory}
        id={catId}
      />
      <CreateNewCategory
        show={showCreateDialog}
        hide={hideDialog}
        category={category}
        subcategory={subcategory}
      />
    </div>
  );
};

export default CategoriesList;
