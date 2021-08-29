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
import Switch from "@material-ui/core/Switch";
import OptionsMenu from "../../../components/Posts/OptionsMenu";

const Editor = dynamic(
  () => import("../../../Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

// Will replace all of this and get it from the api
const LEVELS = ["BASICS", "INTERMEDIATE", "ADVANCED"];
const CATEGORIES = ["WEB", "ML", "DS", "DEVOPS"];
const SUB_CATEGORY = ["SUB1", "SUB2", "SUB3"];

const savedPost = "draft-post";
const Create = () => {
  const [editor, setEditor] = useState(null);
  const [published, setPublised] = useState(false);
  const [header, setHeader] = useState();
  const [level, setLevel] = useState(LEVELS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subcategory, setSubcategory] = useState(SUB_CATEGORY[0]);
  const [tags, setTags] = useState();
  const [editorData, setEditorData] = useState({});
  const [alert, setAlert] = useState({
    type: null,
    message: null,
  });
  // save handler
  const onSave = useSaveCallback(editor);

  // clear data callback
  const clearData = useClearDataCallback(editor);
  // Store a screenshot of the current state in the localstorate under the name of the draft-post
  const saveToLS = async () => {
    const out = await editor.save();
    const data = JSON.stringify({
      header,
      category,
      tags,
      subcategory,
      published,
      level,
      data: out,
    });
    localStorage.setItem(savedPost, data);
    console.log("Post Saved To localstorage");
  };

  const loadFromLS = () => {
    const data = localStorage.getItem(savedPost)
      ? JSON.parse(localStorage.getItem(savedPost))
      : null;

    if (!data) {
      alert("You don't have any posts stored in the localStorage");
      return;
    }
    setHeader(data.header);
    setCategory(data.category);
    setTags(data.tags);
    setSubcategory(data.subcategory);
    setPublised(data.published);
    setLevel(data.level);
    setEditorData(data.data);
  };
  const OPTIONS_LIST = [
    {
      text: "Save To DB",
    },
    {
      text: "Save To LS",
      onClick: saveToLS,
    },
    {
      text: "Load From LS",
      onClick: loadFromLS,
    },
  ];

  return (
    <div className="flex max-h-screen ">
      <SideBar />

      <div className="w-full h-screen border-none max-h-screen overflow-y-scroll bg-gray-50 p-4">
        <div className="flex items-center justify-end mb-4">
          {OPTIONS_LIST.map((option) => (
            <button
              onClick={option.onClick}
              className="bg-blue-100 mr-2 py-2 px-3 rounded-md shadow-md text-blue-600  hover:bg-blue-200"
            >
              {option.text}
            </button>
          ))}
        </div>
        <div className="flex justify-center flex-col mb-9">
          <label className="text-lg font-medium mb-2">Header</label>
          <input
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="py-3 px-4 bg-gray-100 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            name="header"
            placeholder="Blog Title.."
          />
        </div>
        <div className="flex flex-col justify-center mb-9">
          <label className="text-lg font-medium mb-2">Tags</label>
          <input
            className="py-3 px-4 bg-gray-100 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter coma seperated values..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-12 gap-4 mb-9">
          <div className="col-span-3">
            <label
              className={`p-1 px-2 font-medium inline-block rounded-md ${
                published
                  ? "bg-blue-400  text-blue-500"
                  : "bg-red-300 text-red-700"
              }`}
            >
              Publish
            </label>
            <Switch color="primary" onChange={() => setPublised(!published)} />
          </div>
          <div className="col-span-3">
            <OptionsMenu
              currentOption={level}
              options={LEVELS}
              onChange={setLevel}
              label="Level"
            />
          </div>

          <div className="col-span-3">
            <OptionsMenu
              currentOption={category}
              options={CATEGORIES}
              onChange={setCategory}
              label="Category"
            />
          </div>
          <div className="col-span-3">
            <OptionsMenu
              currentOption={subcategory}
              options={SUB_CATEGORY}
              onChange={setSubcategory}
              label="Subcategory"
            />
          </div>
        </div>

        <Editor
          reInit
          editorRef={setEditor}
          options={options}
          data={editorData}
        />
      </div>
    </div>
  );
};

export default Create;