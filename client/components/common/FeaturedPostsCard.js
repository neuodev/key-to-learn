import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Tags from "./Tags";

const FeaturedPostsCard = ({ post, idx }) => {
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");

  return (
    <div
      className={`${
        idx === 0
          ? "col-span-12 lg:col-span-8 lg:row-span-full "
          : "col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-3 "
      }`}
    >
      <div className="w-full">
        {idx === 0 && (
          <h1 className="text-6xl mb-9 hidden lg:block">Key To Learn</h1>
        )}
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
          <h1 className=" text-3xl mb-2 inline-block cursor-pointer hover:underline hover:text-blue-400">
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
