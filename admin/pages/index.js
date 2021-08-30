import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import PostsList from "../components/posts/PostsList";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import { TYPES } from "../utils";
import Pagination from "../components/posts/Pagination";
import Link from "next/link";

const Admin = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  // @todo redirect to login if it is not and admin
  const user = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user || !user.userInfo || !user.userInfo.isAdmin) {
      router.push("/sign-in");
    }
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.userInfo) return;
      setLoading(true);
      const { data } = await axios.get("/api/v1/posts", {
        params: {
          select: "domain,header,slug,likes,createdAt,updatedAt,published",
          limit,
          page,
        },
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      });
      setLoading(false);
      setAlert({
        type: "",
        message: "",
      });
      console.log(data);
      setAllPosts(data.data);
      setCount(data.count);
    };

    fetchPosts();
  }, [page, limit]);

  const nextPage = () => {
    if (page > count) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const updateLimit = (newLimit) => {
    setLimit(newLimit);
  };
  return (
    <div className="bg-gray-50 w-full h-screen pt-5 ">
      <div className="flex items-center justify-between px-5 ">
        <h1 className="text-4xl">Posts</h1>
        <Link href="/admin/posts/create">
          <p className=" w-40 text-lg cursor-pointer py-3 flex items-center justify-center bg-green-100 hover:bg-green-200 rounded-lg font-medium uppercase tracking-wider text-green-700">
            New Post
          </p>
        </Link>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full  h-96">
          <Spinner />
        </div>
      ) : alert.message ? (
        <Alert tyep={TYPES.ERROR} message={alert.message} />
      ) : (
        <div>
          <PostsList posts={allPosts} />
        </div>
      )}
      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        count={count}
        updateLimit={updateLimit}
        limit={limit}
        page={page}
      />
    </div>
  );
};

export default Admin;
