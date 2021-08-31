import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSaveCallback, useClearDataCallback } from "../../Editor/hooks";
import { options } from "../../Editor/options";
// import OptionsMenu from "../../components/Posts/OptionsMenu";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../actions/postActions";
import Alert from "../../components/common/Alert";
import { TYPES } from "../../utils";
import Spinner from "../../components/common/Spinner";
import { getCategories } from "../../actions/categories";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
const Editor = dynamic(
  () => import("../../Editor/editor").then((mod) => mod.EditorContainer),
  { ssr: false }
);

// Will replace all of this and get it from the api
const LEVELS = ["BASICS", "INTERMEDIATE", "ADVANCED"];
const savedPost = "draft-post";
const DEFAULT_ALERT = {
  type: "",
  message: "",
};

const Update = () => {
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);
  const [publish, setPublised] = useState(true);
  const [header, setHeader] = useState("");
  const [level, setLevel] = useState(LEVELS[0]);
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [tags, setTags] = useState("");
  const [editorData, setEditorData] = useState({});
  const [shouldLoadData, setShouldData] = useState(false);
  const [alert, setAlert] = useState({
    type: null,
    message: null,
  });
  const router = useRouter();
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
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (!categories.categories) {
      dispatch(getCategories());
    }

    return () => {
      setAlert({
        type: "",
        message: "",
      });
    };
  }, []);
  const publishPost = async (shouldPublish) => {
    const out = await editor.save();
    dispatch(
      createPost({
        header,
        domain: {
          level,
          categories: [category],
          subcategory: [subcategory],
          tags: tags.split(","),
        },
        published: shouldPublish,
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
      text: "Draft",
      onClick: () => publishPost(false),
    },
    {
      text: "Publish",
      onClick: () => publishPost(true),
    },
  ];

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
      setAlert({
        type: "",
        message: "",
      });
    };
  }, [createPostState]);

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
        console.log(fetchedPost);
        const { body, header, domain } = fetchedPost;
        setEditorData(body);
        setHeader(header);
        setTags(
          domain.tags.length === 0
            ? "NO TAGS"
            : domain.tags.length === 1
            ? domain.tags[0]
            : domain.tags.concat(",")
        );
        setLevel(domain.level);
        setCategory(domain.categories[0]);
        // setSubcategory(subcategory[0]);
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

  const getSubcateories = () => {
    const currentCat = categories.categories.filter((c) => c.name === category);
    return currentCat[0].subcategories;
  };
  return (
    <div className=" max-h-screen w-full p-4 h-screen  overflow-y-scroll ">
      {createPostState.loading && (
        <div className="mb-3 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {alert.message && (
        <div className="mb-3">
          <Alert type={alert.type} message={alert.message} />
        </div>
      )}
      <div>
        <h1 className="my-4">Update Post</h1>
      </div>
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
        <label className="text-lg font-medium mb-4">Header</label>
        <input
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="py-3 px-4 bg-gray-100 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          name="header"
          placeholder="Blog Title.."
        />
      </div>
      <div className="flex flex-col justify-center mb-9">
        <label className="text-lg font-medium mb-4">Tags</label>
        <input
          className="py-3 px-4 bg-gray-100 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Enter coma seperated values..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-lg flex mb-5">
          <p className="text-gray-500 mr-1 font-thin text-lg">Level:</p>{" "}
          <span className="text-lg  font-medium">{level}</span>
        </h2>
      </div>
      <div className="mb-9">
        {categories.loading ? (
          <div>
            <Spinner />
          </div>
        ) : categories.error ? (
          <div>
            <Alert type={TYPES.ERROR} message={categories.error} />
          </div>
        ) : (
          categories.categories && (
            <div className="grid grid-cols-12 gap-4 mb-9">
              <h1 className="col-span-12 text-lg font-medium ">Categories</h1>
              {categories.categories.map((cat) => (
                <button
                  onClick={() => setCategory(cat.name)}
                  key={cat._id}
                  className={`py-2 px-3 bg-gray-100 col-span-2 rounded-full text-center cursor-pointer ${
                    category === cat.name
                      ? "bg-blue-100 text-blue-400"
                      : "bg-gray-100 text-gray-600"
                  } `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )
        )}
        {category && (
          <div className="grid grid-cols-12 gap-4 mt-4 mb-9">
            <h1 className="col-span-12 text-lg font-medium ">SubCategories</h1>
            {getSubcateories().map((sub) => (
              <button
                onClick={() => setSubcategory(sub)}
                key={sub}
                className={`py-2 px-3 ${
                  subcategory === sub
                    ? "bg-blue-100 text-blue-400"
                    : "bg-gray-100 text-gray-600"
                } col-span-4 rounded-full truncate text-center cursor-pointer `}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <Editor
        reInit
        editorRef={setEditor}
        options={options}
        data={editorData}
      />
    </div>
  );
};

export default Update;
