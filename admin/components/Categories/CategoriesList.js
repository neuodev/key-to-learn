import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

const CategoriesList = ({ categories }) => {
  //   categories[0].subcategories.push("lorem", "heksfj", "Machine Learning");
  //   categories[1].subcategories.push("lorem", "heksfj", "Machine Learning");

  return (
    <div className="mt-9">
      {categories.map((cat) => (
        <div className="mb-10" key={cat._id}>
          <div>
            <p className="text-3xl text-gray-700">{cat.name}</p>
          </div>
          <div className="flex items-center justify-start mt-4">
            {cat.subcategories.map((sub) => (
              <p className="mr-4 p-4 flex items-center justify-between bg-blue-100 border border-blue-500 rounded-full text-blue-600 font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-150">
                <span className="mr-2 inline-block truncate">{sub}</span>
                <button className="bg-blue-300  text-xs p-1 px-2 rounded-full hover:bg-blue-400">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </p>
            ))}
            <p className="mr-4 p-4 px-8 bg-blue-100 border border-blue-500 rounded-full text-blue-600 font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-150">
              <FontAwesomeIcon icon={faPlus} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
