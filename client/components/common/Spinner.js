import React from "react";

const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="w-5 h-5 m-3 inline-block bg-indigo-500 rounded-full animate-ping"></span>
    </div>
  );
};

export default Spinner;
