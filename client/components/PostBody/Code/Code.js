import React, { useState } from "react";
import { CODE_THEMES } from "./themes";
import { CopyBlock } from "react-code-blocks";
import Customize from "./Customize";
import { useSelector } from "react-redux";
const Code = ({ data }) => {
  const layout = useSelector((state) => state.layout);

  const [showModel, setShowModel] = useState(true);
  const [showBtn, setShowBtn] = useState(true);
  const hideModelHandler = () => {
    setShowModel(false);
  };
  return (
    <div>
      <div className="relative bg-gray-100 p-5 rounded-lg my-4">
        <button
          onClick={() => setShowModel(true)}
          className="absolute -top-8 right-0 border bg-white rounded-md text-blue-600 font-semibold px-3 py-2 text-xs"
        >
          Customize
        </button>
        <CopyBlock
          language={"python"}
          text={data.code}
          showLineNumbers={false}
          theme={CODE_THEMES[layout.codeTheme]}
          wrapLines={true}
          codeBlock
          wrapLongLines
        />
        <Customize showModel={showModel} hideModel={hideModelHandler} />
      </div>
    </div>
  );
};

export default Code;
