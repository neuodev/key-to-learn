import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faComments, faTags } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Tags from "../../components/common/Tags";
import PostBody from "../../components/PostBody";
import Head from "next/head";

const Post = ({ post }) => {
  const publishedDate = dayjs(post.createdAt).format("MMM DD,YYYY");
  return (
    <div className="p-5 min-h-screen max-w-screen-md">
      <Head>
        <title>{post.header}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={post.domain.tags.toString()} />
      </Head>
      <div className="">
        <img
          className="w-full h-full object-cover "
          src={post.thumbnail}
          alt={post.header}
        />
      </div>
      <h1 className="text-3xl md:text-5xl font-medium my-6 post-heading post-heading-color">
        {post.header}
      </h1>
      <div className="grid items-center  grid-cols-12 gap-3 ">
        <div className="col-span-6 hover:underline hover:text-blue-500 font-medium text-gray-700">
          <span>by</span> <a href="#author">Ahmed Ibrahim</a>
        </div>
        <div className="flex items-center justify-start col-span-6">
          <FontAwesomeIcon icon={faClock} className="text-gray-300 mr-2" />
          <p className="font-medium text-gray-600">{publishedDate}</p>
        </div>
        <a
          href="#comments"
          className="flex items-center justify-start col-span-6 hover:underline hover:text-blue-500 font-medium "
        >
          <FontAwesomeIcon icon={faComments} className="mr-2 text-gray-300 " />
          <p className="font-medium text-gray-600">{3} Comments</p>
        </a>
        <div className=" col-span-6">
          <Tags tags={post.domain} />
        </div>
      </div>
      <PostBody body={post.body} />
    </div>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data: posts } = await axios.get("/api/v1/posts", {
    proxy: {
      host: "localhost",
      port: 9000,
    },
  });

  // Get the paths we want to pre-render based on posts
  const paths = posts.data.map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log(params);
  try {
    const { data } = await axios.get(`/api/v1/posts`, {
      params: {
        slug: params.slug,
      },
      proxy: {
        host: "localhost",
        port: 9000,
      },
    });
    return { props: { post: data.data[0] } };
  } catch (error) {
    console.log(error.message);
  }
}

export default Post;
