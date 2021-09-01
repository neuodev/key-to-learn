import React from "react";

const List = ({ data }) => {
  const { items, style } = data;
  const list = items.map((i) => <li key={i}>{i}</li>);
  return (
    <ul
      className={`post-p-color post-p pl-5 ${
        style === "ordered" ? " list-decimal" : "list-disc"
      } `}
    >
      {items.map((i) => (
        <li className={"mb-1"} key={i}>
          {i.replace(/&nbsp;/g, "")}
        </li>
      ))}
    </ul>
  );
};

export default List;
