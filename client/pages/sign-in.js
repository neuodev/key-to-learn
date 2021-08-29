import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { isValidUserInfo } from "../utils/user";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import Alert from "../components/common/Alert";
import { TYPES } from "../utils";
import { USER_JOIN_RESET } from "../actions/constants";
import Spinner from "../components/common/Spinner";
import { useRouter } from "next/dist/client/router";

const Join = () => {
  const [userInfo, setUserInfo] = useState({
    password: "",
    email: "",
  });
  const [error, setError] = useState({
    field: "",
    message: "",
  });

  const updateState = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  let {
    loading,
    error: joiningError,
    success,
  } = useSelector((state) => state.join);
  const onSubmit = (e) => {
    dispatch({
      type: USER_JOIN_RESET,
    });
    e.preventDefault();
    const isValid = isValidUserInfo(userInfo);
    if (typeof isValid !== "boolean") {
      setError(isValid);
      return;
    }

    setError({
      field: "",
      message: "",
    });

    dispatch(registerUser(userInfo));
  };
  const router = useRouter();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({
          type: USER_JOIN_RESET,
        });
        router.push("/");
      }, 1500);
    }
  }, [success, joiningError]);
  return (
    <div className=" w-full h-full min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className=" transform   -translate-y-12 md:shadow-2xl w-full md:max-w-xl p-9 py-8 rounded-md md:border "
      >
        <div className="mb-4 flex items-center justify-center ">
          <Link href="/">
            <div className="flex items-center justify-start">
              <div className="inline-block mr-2 bg-gray-900 text-white py-3 px-4 text-lg shadow-lg rounded-full">
                <FontAwesomeIcon icon={faCode} />
              </div>
              <p className="font-medium text-gray-800 uppercase tracking-wider text-4xl">
                Key To Learn
              </p>
            </div>
          </Link>
        </div>
        <div className="text-center font-medium mb-4 text-gray-500">
          <p>
            Don't have an account ?{" "}
            <Link href="/join">
              <span className="inline-block text-blue-400 hover:underline cursor-pointer">
                Join Us
              </span>
            </Link>
          </p>
        </div>
        {loading && (
          <div>
            <Spinner />
          </div>
        )}
        {joiningError && (
          <div className="mb-4">
            <Alert message={joiningError} type={TYPES.ERROR} />
          </div>
        )}
        {success && (
          <div className="mb-4">
            <Alert
              message={`Welcom ${userInfo.name} to Key To Learn`}
              type={TYPES.SUCCESS}
            />
          </div>
        )}

        <div className="flex flex-col justify-center mb-4">
          <label className="font-medium mb-1 text-gray-600 tracking-wider">
            Email
          </label>
          <input
            className="py-3 px-2 rounded-md bg-gray-100 placeholder-gray-400"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={updateState}
          />
          {error.field === "email" && (
            <p className="text-red-400 text-xs">{error.message}</p>
          )}
        </div>
        <div className="flex flex-col justify-center mb-4">
          <label className="font-medium mb-1 text-gray-600 tracking-wider">
            Password
          </label>
          <input
            className="py-3 px-2 rounded-md bg-gray-100 placeholder-gray-400"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={userInfo.password}
            onChange={updateState}
          />
          {error.field === "password" && (
            <p className="text-red-400 text-xs">{error.message}</p>
          )}
        </div>

        <button className="w-full mb-4 py-3 px-2 bg-blue-100 text-blue-900 uppercase tracking-wider font-medium hover:bg-blue-200 rounded-md  ">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Join;
