import React from "react";
import Code from "./Code/Code";
import Header from "./Header";
import List from "./List";
import Text from "./Text";

const PostBody = ({ body }) => {
  return (
    <div className="py-8 text-gray-800">
      {body.blocks.slice(1).map((block) => {
        console.log("block", block);
        if (block.type === "header") {
          return <Header key={block.id} data={JSON.parse(block.data)} />;
        }
        if (block.type === "paragraph") {
          return <Text data={JSON.parse(block.data)} />;
        }
        if (block.type === "list") {
          return <List data={JSON.parse(block.data)} />;
        }
        if (block.type === "code") {
          return <Code data={JSON.parse(block.data)} />;
        }
      })}
      {/* <pre>{JSON.stringify(body, null, 2)}</pre> */}
    </div>
  );
};

export default PostBody;
