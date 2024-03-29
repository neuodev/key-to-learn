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
  const [level, setLevel] = useState("");
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
  }, [show]);
  const filterHandler = () => {
    const query = {};
    if (category) {
      query["domain.categories"] = category;
    }
    if (subCat) {
      query["domain.subcategory"] = subCat;
    }

    if (level) {
      query["domain.level"] = level;
    }

    router.push({
      pathname: "/search",
      query,
    });
    setShow(false);
  };

  const clearFilter = () => {
    router.push("/search");
  };

  const LEVELS = ["BASICS", "INTERMEDIATE", "ADVANCED"];

  return (
    <div className={`relative z-40`}>
      <div
        className={`flex items-center ${
          postsCount ? "justify-between" : "justify-between"
        }  py-4`}
      >
        {postsCount ? (
          <p className="font-thin text-lg">
            Posts (<span className="font-medium">{postsCount}</span>)
          </p>
        ) : null}
        <div className="flex items-center justify-center">
          {Object.keys(router.query).map((field) => {
            if (field != "search") {
              return (
                <div className="px-3 py-2 uppercase tracking-wider hover:bg-gray-200 bg-gray-100 rounded-md mr-2">
                  {router.query[field]}
                </div>
              );
            }
          })}
        </div>
        <div>
          {Object.keys(router.query).length > 0 && (
            <button
              onClick={clearFilter}
              className="px-3 py-2 hover:bg-gray-200 bg-gray-100 rounded-md mr-2"
            >
              Clear Filer
            </button>
          )}
          <button
            onClick={() => setShow(true)}
            className="px-3 py-2 hover:bg-gray-200 bg-gray-100 rounded-md "
          >
            <FontAwesomeIcon icon={faSlidersH} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className={`${
          show ? "absolute" : "hidden"
        } top-0 left-0 w-full h-96 bg-gray-50 rounded-md shadow-2xl border overflow-y-scroll`}
      >
        <div className="w-full h-full shadow-inner p-6">
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
                  <h1 className="text-xl text-gray-700 ">Levels</h1>
                  {level && (
                    <button
                      onClick={() => setLevel("")}
                      className="text-xs bg-gray-200 px-2 rounded-md py-1 text-gray-700 ml-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap">
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={` mr-4  cursor-pointer truncate py-3 px-4 rounded-full  font-medium uppercase tracking-wider border  ${
                        level === l
                          ? "hover:bg-blue-50 bg-blue-100 text-blue-800 border-blue-600 "
                          : "hover:bg-gray-50 bg-gray-100 text-gray-800 border-gray-600"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-3 flex flex-wrap items-center justify-start">
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
                <div className="flex flex-wrap ">
                  {categories &&
                    categories.map((cat) => (
                      <button
                        key={cat._id}
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
                          key={sub}
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
    </div>
  );
};

export default Filter;
