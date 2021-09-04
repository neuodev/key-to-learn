import React from "react";

const gridOptions = {
  1: ["grid-cols-12", "col-span-12"],
  2: ["grid-cols-12", "col-span-6"],
  3: ["grid-cols-12", "col-span-4"],
  4: ["grid-cols-12", "col-span-3"],
  5: ["grid-cols-10", "col-span-2"],
  6: ["grid-cols-12", "col-span-12"],
  7: ["grid-cols-7", "col-span-1"],
  8: ["grid-cols-8", "col-span-1"],
  9: ["grid-cols-9", "col-span-1"],
  10: ["grid-cols-10", "col-span-1"],
  11: ["grid-cols-11", "col-span-1"],
  12: ["grid-cols-12", "col-span-1"],
};

const Table = ({ data: { content } }) => {
  const numberOfCols = content[0].length;

  return (
    <div className="border rounded-md mb-9">
      {content.map((row, idx) => (
        <div
          key={idx}
          className={` cursor-pointer ${
            idx < content.length - 1 && "border-b"
          } hover:bg-gray-100 grid  ${gridOptions[numberOfCols][0]}`}
        >
          {row.map((col, idx) => (
            <div
              className={` ${idx === 0 && "border-r"} ${
                gridOptions[numberOfCols][1]
              } cols px-4 py-3 post-p post-p-color`}
              key={idx}
            >
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
