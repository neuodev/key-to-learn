import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
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
      const { data } = await axios.get("/api/v1/posts", {
        params: {
          select: "domain,header,slug,likes,createdAt,updatedAt,published",
        },
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      });
      console.log(data);
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex w-full h-full  min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="">Content</div>
    </div>
  );
};

export default Admin;
