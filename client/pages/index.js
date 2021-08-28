import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFeaturedPosts } from "../actions/postsActions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedPosts());
  }, []);
  return <div></div>;
}
