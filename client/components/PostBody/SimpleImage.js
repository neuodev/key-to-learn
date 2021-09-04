import React from "react";

const SimpleImage = ({ data }) => {
  return (
    <div className="w-full">
      <div className="w-full bg-red-200">
        <img
          className="block object-cover mx-auto"
          src={data.url}
          alt={data.caption}
        />
      </div>
      <p className="py-2 px-4 text-lg font-medium post-p post-p-color">
        {data.caption}
      </p>
    </div>
  );
};

export default SimpleImage;
