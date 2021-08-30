import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../actions/categories";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import { TYPES } from "../utils";
import CategoriesList from "../components/Categories/CategoriesList";

const Categories = () => {
  const createCategoryState = useSelector((state) => state.createCategory);
  const updateCategoryState = useSelector((state) => state.updateCategory);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [createCategoryState.success, updateCategoryState.success]);
  return (
    <div className="w-full bg-gray-100 h-screen overflow-y-scroll p-4">
      <div>
        <h1 className="text-4xl mb-4">Categories & Tags</h1>
      </div>
      {categories.loading ? (
        <div className="h-1/4 flex items-center justify-center">
          <Spinner />
        </div>
      ) : categories.error ? (
        <div className="my-4 mx-4 shadow-md">
          <Alert message={categories.error} type={TYPES.ERROR} />
        </div>
      ) : (
        categories.categories && (
          <div className="w-full h-fll">
            <CategoriesList categories={categories.categories} />
          </div>
        )
      )}
    </div>
  );
};

export default Categories;
