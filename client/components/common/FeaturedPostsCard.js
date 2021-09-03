import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Tags from "./Tags";

const FeaturedPostsCard = ({ post, idx }) => {
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");

  return (
    <div
      className={`${"col-span-12 sm:col-span-6 lg:col-span-4 lg:row-span-3 "} max-w-sm mx-auto`}
    >
      <div className="w-full">
        <Link href={`/post/${post.slug}`}>
          <div className="mb-4 cursor-pointer h-full w-full">
            <img
              src={post.thumbnail}
              className="w-full h-full object-cover"
              alt={post.header}
            />
          </div>
        </Link>
        <Link href={`/post/${post.slug}`}>
          <h1 className=" sm:text-lg sm:font-medium turncate text-3xl  mb-2 inline-block cursor-pointer hover:underline hover:text-blue-400">
            {post.header}
          </h1>
        </Link>
        <div className="flex items-center ">
          <p className="mr-3 text-sm font-medium text-gray-700">
            {publishedDate}
          </p>
          <Tags tags={post.domain} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostsCard;
