import React from "react";
import CheckList from "./CheckList";
import Code from "./Code/Code";
import Header from "./Header";
import List from "./List";
import Quote from "./Quote";
import SimpleImage from "./SimpleImage";
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
        if (block.type === "quote") {
          return <Quote data={data} />;
        }
        if (block.type === "checklist") {
          return <CheckList data={data} />;
        }
        if (block.type === "simpleImage") {
          return <SimpleImage data={data} />;
        }
      })}
    </div>
  );
};

export default PostBody;
