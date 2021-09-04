import React from "react";
import Code from "./Code/Code";
import Header from "./Header";
import List from "./List";
import Table from "./Table";
import Text from "./Text";

const PostBody = ({ body }) => {
  return (
    <div className="py-8 text-gray-800">
      {body.blocks.slice(1).map((block) => {
        const data = JSON.parse(block.data);
        if (block.type === "header") {
          return <Header key={block.id} data={data} />;
        }
        if (block.type === "paragraph") {
          return <Text data={data} />;
        }
        if (block.type === "list") {
          return <List data={data} />;
        }
        if (block.type === "code") {
          return <Code data={data} />;
        }
        if (block.type === "table") {
          return <Table data={data} />;
        }
      })}
      <pre>{JSON.stringify(body, null, 2)}</pre>
    </div>
  );
};

export default PostBody;
