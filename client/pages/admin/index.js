import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import PostsList from "../../components/Admin/posts/PostsList";
import Spinner from "../../components/common/Spinner";
import Alert from "../../components/common/Alert";
import { TYPES } from "../../utils";
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
  useEffect(() => {
    if (!user || !user.userInfo || !user.userInfo.isAdmin) {
      router.push("/sign-in");
    }
  });
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/v1/posts", {
        params: {
          select: "domain,header,slug,likes,createdAt,updatedAt,published",
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
      setAllPosts(data.data);
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex w-full h-full  min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="bg-gray-50 w-full ">
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
    </div>
  );
};

export default Admin;
