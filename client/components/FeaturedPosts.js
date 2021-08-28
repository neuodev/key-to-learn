import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeaturedPosts } from "../actions/postsActions";
import FeaturedPostsCard from "./common/FeaturedPostsCard";

const FeaturedPosts = () => {
  const { posts, error, loading } = useSelector((state) => state.featuredPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedPosts());
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>error</h1>
      ) : (
        <div className="p-4">
          {posts.map((post) => (
            <FeaturedPostsCard post={post} key={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPosts;
