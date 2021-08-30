import React, { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/Sidebar";
import dynamic from "next/dynamic";
import { useSaveCallback, useClearDataCallback } from "../../../Editor/hooks";
import { options } from "../../../Editor";
import Switch from "@material-ui/core/Switch";
import OptionsMenu from "../../../components/Posts/OptionsMenu";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../../actions/postsActions";
import Alert from "../../../components/common/Alert";
import { TYPES } from "../../../utils";
import Spinner from "../../../components/common/Spinner";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const Editor = dynamic(
  () => import("../../../Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

// Will replace all of this and get it from the api
const LEVELS = ["BASICS", "INTERMEDIATE", "ADVANCED"];
const CATEGORIES = ["WEB", "ML", "DS", "DEVOPS"];
const SUB_CATEGORY = ["SUB1", "SUB2", "SUB3"];
const DEFAULT_ALERT = {
  type: "",
  message: "",
};
const savedPost = "draft-post";
const Create = () => {
  const [editor, setEditor] = useState(null);
  const [publish, setPublised] = useState(false);
  const [header, setHeader] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subcategory, setSubcategory] = useState(SUB_CATEGORY[0]);
  const [tags, setTags] = useState("");
  const [editorData, setEditorData] = useState({});
  const [shouldLoadData, setShouldData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: null,
    message: null,
  });
  // save handler
  const router = useRouter();
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
      publish,
      level,
      data: out,
    });
    localStorage.setItem(savedPost, data);
    setAlert({
      type: TYPES.SUCCESS,
      message: "Post saved as a draft",
    });
  };

  const loadFromLS = () => {
    const data = localStorage.getItem(savedPost)
      ? JSON.parse(localStorage.getItem(savedPost))
      : null;

    if (!data) {
      setAlert({
        type: TYPES.ERROR,
        message: "You don't have any posts stored in the localStorage",
      });
      return;
    }
    setHeader(data.header);
    setCategory(data.category);
    setTags(data.tags);
    setSubcategory(data.subcategory);
    setPublised(data.publish);
    setLevel(data.level);
    editor.isReady.then(() => {
      // fixing an annoying warning in Chrome `addRange(): The given range isn't in document.`
      setTimeout(() => {
        editor.render(data.data);
      }, 100);
    });
  };

  const dispatch = useDispatch();
  const createPostState = useSelector((state) => state.createPost);

  const updatePost = async () => {
    const out = await editor.save();
    dispatch(
      createPost({
        header,
        tags: tags.split(","),
        publish,
        level,
        category,
        subcategory,
        body: out,
      })
    );
  };
  const OPTIONS_LIST = [
    {
      text: "Save To LS",
      onClick: saveToLS,
    },
    {
      text: "Load From LS",
      onClick: loadFromLS,
    },
    {
      text: "Update",
      onClick: updatePost,
    },
  ];
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setAlert(DEFAULT_ALERT);
    if (!router.query.title) {
      router.push("/admin");
      return;
    }

    if (!user.userInfo || !user.userInfo.isAdmin) {
      router.push("/");
      return;
    }
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/v1/posts", {
          params: {
            slug: router.query.title,
          },
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.userInfo.token}`,
          },
        });
        if (data.data.length === 0) {
          setAlert({
            type: TYPES.ERROR,
            message: "Post Not Found",
          });
          return;
        }

        const fetchedPost = data.data[0];
        fetchedPost.body.blocks = fetchedPost.body.blocks.map((b) => ({
          ...b,
          data: JSON.parse(b.data),
        }));
        setEditorData(fetchedPost.body);
        setHeader(fetchedPost.header);
        setPublised(fetchedPost.published);
        setTags(fetchedPost.domain.tags.concat(","));
        setLevel(fetchedPost.domain.level);
        setCategory(fetchedPost.domain.categories[0]);
        setSubcategory(fetchedPost.domain.subcategory[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert({
          type: TYPES.ERROR,
          message:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
    if (!header) {
      fetchPost();
    }
    if (editor && editorData && shouldLoadData) {
      // Map response from json to normal javascript obj
      editor.isReady.then(() => {
        setTimeout(() => {
          setShouldData(false);
          editor.render(editorData);
        }, 1000);
      });
    }
    return () => {
      setAlert(DEFAULT_ALERT);
      setLoading(false);
    };
  }, [router, editor, editorData]);

  useEffect(() => {
    if (createPostState.error) {
      setAlert({
        type: TYPES.ERROR,
        message: createPostState.error,
      });
    }
    if (createPostState.success) {
      setAlert({
        type: TYPES.SUCCESS,
        message: createPostState.success,
      });
    }

    return () => {
      setAlert(DEFAULT_ALERT);
    };
  }, [createPostState]);
  return (
    <div className="flex max-h-screen ">
      <SideBar />
      <div className="w-full h-screen border-none max-h-screen overflow-y-scroll bg-gray-50 p-4">
        {loading && (
          <div className="mb-3 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {alert.message && (
          <div className="mb-3">
            <Alert type={alert.type} message={alert.message} />
          </div>
        )}
        <div className="flex items-center justify-end mb-4">
          {OPTIONS_LIST.map((option) => (
            <button
              key={option.text}
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
              onClick={() => setPublised(!publish)}
              className={` cursor-pointer p-1 px-2 font-medium flex items-center justify-center rounded-md w-full h-full  ${
                publish
                  ? "bg-blue-200  text-blue-500 hover:bg-blue-300"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Publish
            </label>
            {/* <Switch color="primary" onChange={() => setPublised(!publish)} /> */}
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
