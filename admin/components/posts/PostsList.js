import Link from "next/link";
import React from "react";
import Pagination from "./Pagination";
import PostItem from "./PostItem";

const TITLES = [
  {
    text: "Header",
    span: "col-span-2",
  },
  {
    text: "Domains",
    span: "col-span-3",
  },
  {
    text: "Publised Date",
    span: "col-span-2",
  },
  {
    text: "Update Date",
    span: "col-span-2",
  },
  {
    text: "Likes",
    span: "col-span-1 text-center",
  },
  {
    text: "Publised",
    span: "col-span-1 text-center",
  },
  {
    text: "Del",
    span: "col-span-1 text-center",
  },
];
const PostsList = ({ posts }) => {
  return (
    <div className=" w-full h-full max-h-full overflow-y-scroll p-4">
      <div className="border mt-4 rounded-md ">
        <div className="grid grid-cols-12 w-full gap-2 bg-blue-100 p-2 px-4  rounded-t-md ">
          {TITLES.map((t) => (
            <div className={`${t.span} font-medium text-blue-600`} key={t.text}>
              {t.text}
            </div>
          ))}
        </div>
        {posts.map((post, idx) => (
          <PostItem post={post} key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
