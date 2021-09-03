import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../actions/postsActions";
import { TYPES } from "../../utils";
import Alert from "../common/Alert";
import Spinner from "../common/Spinner";
import PostCard from "../Search/PostCard";
const AllPosts = () => {
  const { loading, error, posts, count } = useSelector(
    (state) => state.allPosts
  );
  const dispatch = useDispatch();
  const loader = useRef(null);

  const [page, setPage] = useState(1);
  useEffect(() => {
    if (page <= Math.ceil(count / 1) || count === 0)
      dispatch(getAllPosts(1, page));
  }, [page]);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && page <= Math.ceil(count / 1)) {
        setPage((prev) => prev + 1);
      }
    },
    [count]
  );
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  return (
    <div className="p-4">
      {error ? (
        <div className="mt-20">
          <Alert type={TYPES.ERROR} message={error} />
        </div>
      ) : (
        <div className="grid gap-5 mb-10 mt-0 grid-cols-12">
          {posts &&
            posts.map((post, idx) => (
              <div
                className="col-span-12 sm:col-span-6 md:col-span-4 "
                key={post._id + idx}
              >
                <PostCard post={post} />
              </div>
            ))}
        </div>
      )}
      {loading && (
        <div className="w-full h-full mt-20">
          <Spinner />
        </div>
      )}
      <div ref={loader} />
    </div>
  );
};

export default AllPosts;
