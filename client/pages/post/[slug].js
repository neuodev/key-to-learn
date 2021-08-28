import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Post = ({ post }) => {
  console.log(post);

  return (
    <div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
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
  try {
    const { data } = await axios.get(`/api/v1/posts`, {
      slug: params.slug,
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
