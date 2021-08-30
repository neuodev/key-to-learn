import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Tags from "../common/Tags";
import Link from "next/link";

const PostItem = ({ post, idx }) => {
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");
  const updatedDate = dayjs(post.updatedAt).format("MMM DD,YYYY");

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
      <div className="col-span-1">{post.likes.length}</div>
      <div className="col-span-2">
        {post.published ? (
          <div className="w-full flex items-center justify-center px-2 py-1 bg-green-100 text-green-500">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center px-2 py-1 bg-red-100 text-red-500">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
