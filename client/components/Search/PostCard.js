import React from "react";
import Image from "next/image";
import Tags from "../common/Tags";
import Link from "next/link";
import dayjs from "dayjs";
const PostCard = ({ post }) => {
  const publishedDate = dayjs(post.updatedAt).format("MMM DD,YYYY");
  return (
    <div className={` w-full max-w-sm md:max-w-none mx-auto`}>
      <div className="w-full ">
        <Link href={`/post/${post.slug}`}>
          <div className="mb-4 cursor-pointer h-44 w-full">
            <img
              src={post.thumbnail}
              className="w-full h-full object-cover "
              alt={post.header}
            />
          </div>
        </Link>
        <Link href={`/post/${post.slug}`}>
          <h1 className=" text-xl md:text-2xl lg:text-lg mb-2 inline-block cursor-pointer hover:underline hover:text-blue-400 capitalize">
            {post.header}
          </h1>
        </Link>
        <div className="flex items-center ">
          <p className="mr-3 text-sm font-medium text-gray-700 lg:text-xs">
            {publishedDate}
          </p>
          <Tags tags={post.domain} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
