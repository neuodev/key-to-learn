import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Tags from "../common/Tags";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/postActions";
const PostItem = ({ post, idx }) => {
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");
  const updatedDate = dayjs(post.updatedAt).format("MMM DD,YYYY");
  const dispatch = useDispatch();

  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };
  return (
    <div className="grid grid-cols-12 w-full py-3 px-4">
      <div className="col-span-2 font-medium text-gray-700 cursor-pointer">
        <Link href={`/admin/posts/update?title=${post.slug}`}>
          <p className="truncate">{post.header}</p>
        </Link>
      </div>
      <div className="col-span-3">
        <Tags tags={post.domain} />
      </div>
      <div className="col-span-2">{publishedDate}</div>
      <div className="col-span-2">{updatedDate}</div>
      <div className="col-span-1 flex items-center justify-center">
        {post.likes.length}
      </div>
      <div className="col-span-1">
        {post.published ? (
          <div className="w-full flex items-center justify-center   ">
            <span className="bg-blue-100 text-blue-500 px-2.5 py-1 rounded-full">
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center   ">
            <span className="bg-red-100 text-red-500 px-2.5 py-1 rounded-full">
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        )}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <button onClick={deletePostHandler} className="text-red-300">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default PostItem;
