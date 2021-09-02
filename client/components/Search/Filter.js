import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/postsActions";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import { TYPES } from "../../utils";
import { useRouter } from "next/dist/client/router";
const Filter = ({ postsCount }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [subCat, setSubCat] = useState("");
  const ref = useRef(null);
  const router = useRouter();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [ref, show]);
  const filterHandler = () => {
    let url;
    if (category && subCat) {
      url = `/search?domain.categories=${category}&domain.subcategory=${subCat}`;
    } else if (category) {
      url = `/search?domain.categories=${category}`;
    } else {
      url = `/search?domain.subcategory=${subCat}`;
    }

    router.push(url);
    setShow(false);
  };
  return (
    <div className={`relative z-40`}>
      <div className="flex items-center justify-between py-4">
        <p className="font-thin text-lg">
          Posts (<span className="font-medium">{postsCount}</span>)
        </p>
        <button
          onClick={() => setShow(true)}
          className="px-3 py-2 hover:bg-gray-200 bg-gray-100 rounded-md "
        >
          <FontAwesomeIcon icon={faSlidersH} />
        </button>
      </div>
      <div
        ref={ref}
        className={`${
          show ? "absolute" : "hidden"
        } top-0 left-0 w-full h-96 bg-gray-50 rounded-md shadow-2xl border p-6`}
      >
        <h1 className="text-xl mb-4 font-semibold text-gray-700">
          Filter Settings
        </h1>

        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : error ? (
          <div>
            <Alert type={TYPES.ERROR} message={error} />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-start">
                <h1 className="text-xl text-gray-700 ">Categories</h1>
                {category && (
                  <button
                    onClick={() => setCategory("")}
                    className="text-xs bg-gray-200 px-2 rounded-md py-1 text-gray-700 ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex ">
                {categories &&
                  categories.map((cat) => (
                    <button
                      onClick={() => setCategory(cat.name)}
                      className={` mr-4  cursor-pointer truncate py-3 px-4 rounded-full  font-medium uppercase tracking-wider border  ${
                        category === cat.name
                          ? "hover:bg-blue-50 bg-blue-100 text-blue-800 border-blue-600 "
                          : "hover:bg-gray-50 bg-gray-100 text-gray-800 border-gray-600"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-start">
                <h1 className="text-xl text-gray-700 ">Subcategories</h1>
                {subCat && (
                  <button
                    onClick={() => setSubCat("")}
                    className="text-xs bg-gray-200 px-2 rounded-md py-1 text-gray-700 ml-2"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex">
                {categories &&
                  categories.map((cat) => {
                    return cat.subcategories.map((sub) => (
                      <button
                        onClick={() => setSubCat(sub)}
                        className={` mr-4  cursor-pointer truncate py-3 px-4 rounded-full  font-medium uppercase tracking-wider border  ${
                          subCat === sub
                            ? "hover:bg-blue-50 bg-blue-100 text-blue-800 border-blue-600 "
                            : "hover:bg-gray-50 bg-gray-100 text-gray-800 border-gray-600"
                        }`}
                      >
                        {sub}
                      </button>
                    ));
                  })}
              </div>
            </div>

            <button
              onClick={filterHandler}
              className="flex items-center justify-center bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faSearch} />
              <p className="ml-2">Search</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
