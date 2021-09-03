import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/postsActions";
const AllTopics = () => {
  const { categories, loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!categories) {
      dispatch(getCategories());
    }
  }, []);

  return (
    <div className="p-4 ">
      <div className="mb-3 flex flex-wrap items-center justify-start">
        <h1 className="text-3xl text-gray-700 ">All Topics</h1>
      </div>
      <div className="flex flex-wrap ">
        {categories &&
          categories.map((cat) => (
            <button
              key={cat._id}
              className={` mr-4 mb-4 cursor-pointer truncate py-3 px-4 rounded-md  font-medium uppercase tracking-wider border  ${"hover:bg-gray-50 bg-gray-100 text-gray-800 "}`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      <div className="flex">
        {categories &&
          categories.map((cat) => {
            return cat.subcategories.map((sub) => (
              <button
                key={sub}
                className={`mr-4 mb-4 cursor-pointer truncate py-3 px-4 rounded-md  font-medium uppercase tracking-wider border  ${"hover:bg-gray-50 bg-gray-100 text-gray-800 "}`}
              >
                {sub}
              </button>
            ));
          })}
      </div>
    </div>
  );
};

export default AllTopics;
