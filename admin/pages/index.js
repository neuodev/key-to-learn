import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import PostsList from "../components/posts/PostsList";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import { TYPES } from "../utils";

const Admin = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });
  // @todo redirect to login if it is not and admin
  const user = useSelector((state) => state.user);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user || !user.userInfo || !user.userInfo.isAdmin) {
  //     router.push("/sign-in");
  //   }
  // });
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/v1/posts", {
        params: {
          select: "domain,header,slug,likes,createdAt,updatedAt,published",
        },
        headers: {
          "content-type": "application/json",
          // Authorization: `Bearer ${user.userInfo.token}`,
        },
      });
      setLoading(false);
      setAlert({
        type: "",
        message: "",
      });
      setAllPosts(data.data);
    };

    fetchPosts();
  }, []);
  return (
    <div className="bg-gray-50 w-full h-screen pt-5">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : alert.message ? (
        <Alert tyep={TYPES.ERROR} message={alert.message} />
      ) : (
        <PostsList posts={allPosts} />
      )}
    </div>
  );
};

export default Admin;
