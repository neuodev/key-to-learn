import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const Code = ({ data }) => {
  return (
    <div className="bg-gray-400 p-5 rounded-lg my-4">
      <div>
        <CopyBlock
          language={"python"}
          text={data.code}
          showLineNumbers={false}
          theme={dracula}
          wrapLines={true}
          codeBlock
          wrapLongLines
        />
      </div>
    </div>
  );
};

export default Code;
