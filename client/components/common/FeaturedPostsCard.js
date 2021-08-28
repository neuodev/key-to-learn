import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Tags from "./Tags";

const FeaturedPostsCard = ({ post }) => {
  const slug = post.header.toLowerCase().replace(/ /g, "-");
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");
  return (
    <div className="mb-3">
      <Link href={`/post/${slug}`}>
        <div className="w-full">
          <div className="mb-4 ">
            <img
              src={post.thumbnail}
              className="w-full h-full object-cover"
              alt={post.header}
            />
          </div>
          <h1 className="w-full text-3xl mb-2">{post.header}</h1>
          <div className="flex items-center ">
            <p className="mr-3 text-sm font-medium text-gray-700">
              {publishedDate}
            </p>
            <Tags tags={post.domain} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPostsCard;
