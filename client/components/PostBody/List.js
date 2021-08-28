import React from "react";

const List = ({ data }) => {
  const { items, style } = data;
  const list = items.map((i) => <li key={i}>{i}</li>);
  return <div>{style === "ordered" ? <ol>{list}</ol> : <ul>{list}</ul>}</div>;
};

export default List;
