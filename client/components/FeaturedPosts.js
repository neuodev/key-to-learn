import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeaturedPosts } from "../actions/postsActions";
import FeaturedPostsCard from "./common/FeaturedPostsCard";
import FeaturedPostsSkeleton from "./FeaturedPostsSkeleton";

const FeaturedPosts = () => {
  const { posts, error, loading } = useSelector((state) => state.featuredPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedPosts());
  }, []);
  return (
    <div className="mt-4">
      <div>
        <h1 className="p-4 text-3xl font-semibold tracking-wider">
          Key To Learn Tutorials
        </h1>
      </div>
      {loading ? (
        <FeaturedPostsSkeleton />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="p-4 grid grid-cols-12 gap-5 my-7">
          {posts.map((post, idx) => (
            <FeaturedPostsCard idx={idx} post={post} key={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPosts;
