import React from "react";

const CheckList = ({ data }) => {
  return (
    <div className="mb-9">
      <ul>
        {data.items.map((item, idx) => (
          <li key={idx} className=" mb-2 flex items-center justify-start">
            <span
              className={`w-4 h-4 inline-block rounded-full mr-2 ${
                item.checked ? "bg-blue-400" : "border"
              }`}
            ></span>
            <p className="text-lg">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList;
