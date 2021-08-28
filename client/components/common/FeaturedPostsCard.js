import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedPostsCard = ({ post }) => {
  console.log(post.thumbnail);
  return (
    <div>
      <Link href="lorem">
        <div>
          <img src={post.thumbnail} />
        </div>
      </Link>
    </div>
  );
};

export default FeaturedPostsCard;
