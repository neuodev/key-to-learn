import React from "react";
import Header from "./Header";
import List from "./List";
import Text from "./Text";

const PostBody = ({ body }) => {
  return (
    <div>
      {body.blocks.map((block) => {
        if (block.type === "header") {
          return <Header text={JSON.parse(block.data).text} as="h1" />;
        }
        if (block.type === "paragraph") {
          return <Text text={JSON.parse(block.data).text} />;
        }
        if (block.type === "list") {
          return <List data={JSON.parse(block.data)} />;
        }
      })}
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
    </div>
  );
};

export default PostBody;
