import Link from "next/link";
import React from "react";
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
    span: "col-span-1",
  },
  {
    text: "Publised",
    span: "col-span-2",
  },
];
const PostsList = ({ posts }) => {
  return (
    <div className=" w-full h-full max-h-full overflow-y-scroll p-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-4xl">Posts</h1>
        <Link href="/admin/posts/create">
          <p className=" w-40 text-lg cursor-pointer py-3 flex items-center justify-center bg-green-100 hover:bg-green-200 rounded-lg font-medium uppercase tracking-wider text-green-700">
            New Post
          </p>
        </Link>
      </div>
      <div className="border mt-4 rounded-md shadow-xl">
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
