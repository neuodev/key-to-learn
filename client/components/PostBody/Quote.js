import React from "react";

const Quote = ({ data }) => {
  return (
    <div className="mb-9">
      <blockquote class="sidekick">
        {data.text} <cite> {data.caption}</cite>
      </blockquote>
    </div>
  );
};

export default Quote;
