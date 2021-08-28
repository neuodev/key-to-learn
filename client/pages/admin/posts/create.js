import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/Sidebar";
import dynamic from "next/dynamic";
import {
  useLoadData,
  useSaveCallback,
  useSetData,
  useClearDataCallback,
} from "../../../Editor/hooks";
import { options } from "../../../Editor";

const Editor = dynamic(
  () => import("../../../Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

const Create = () => {
  const [editor, setEditor] = useState(null);

  // save handler
  const onSave = useSaveCallback(editor);

  // clear data callback
  const clearData = useClearDataCallback(editor);

  const OPTIONS_LIST = [
    {
      text: "Save To DB",
    },
    {
      text: "Save To LS",
    },
  ];

  return (
    <div className="flex max-h-screen ">
      <SideBar />

      <div className="w-full h-screen border-none max-h-screen overflow-y-scroll bg-gray-50 p-4">
        <div className="flex items-center justify-end mb-4">
          {OPTIONS_LIST.map((option) => (
            <button className="bg-gray-100 mr-2 py-2 px-3 rounded-md shadow-md text-gray-600  hover:bg-gray-200">
              {option.text}
            </button>
          ))}
        </div>

        <Editor reInit editorRef={setEditor} options={options} />
      </div>
    </div>
  );
};

export default Create;
