import React, { useEffect, useState } from "react";
import SearchFrom from "../components/Search/SearchFrom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import { TYPES } from "../utils";
import PostCard from "../components/Search/PostCard";
import { searchPosts } from "../actions/postsActions";
import { SEARCH_POSTS_RESET } from "../actions/constants";
import { useRouter } from "next/dist/client/router";
import { constractSearchParams } from "../utils/posts";
import Head from "next/head";

const Search = () => {
  const { posts, loading, error, count } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const clearSearch = () => {
    setSearchText("");
  };
  const updateSearchText = (t) => {
    setSearchText(t);
  };

  useEffect(() => {
    dispatch(searchPosts(constractSearchParams(searchText, router.query)));
    return () => {
      dispatch({
        type: SEARCH_POSTS_RESET,
      });
    };
  }, [searchText, router.query]);
  return (
    <div className="mt-4 p-4">
      <Head>
        <title>Search {searchText && `| ` + searchText}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={"Search key to learn posts"} />
      </Head>
      <SearchFrom searchText={searchText} updateSearchText={updateSearchText} />
      <div>
        {loading ? (
          <div className="w-full h-full mt-20">
            <Spinner />
          </div>
        ) : error ? (
          <div className="mt-20">
            <Alert type={TYPES.ERROR} message={error} />
          </div>
        ) : posts.length === 0 ? (
          <div className="my-10 p-4 bg-gray-800 py-6">
            <p className="text-white font-medium">Post not found</p>
            <button
              onClick={clearSearch}
              className="text-gray-800 py-2 px-4  rounded-sm font-medium tracking-wider mt-3 bg-white"
            >
              See All Posts
            </button>
          </div>
        ) : (
          <div className="grid gap-5 my-10 grid-cols-12">
            <div className="col-span-12">
              <p className="font-thin text-lg">
                Posts (<span className="font-medium">{count}</span>)
              </p>
            </div>
            {posts.map((post) => (
              <div
                className="col-span-12 sm:col-span-6 md:col-span-4 "
                key={post._id}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
