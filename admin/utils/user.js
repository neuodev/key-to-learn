export const isValidSignIn = (userInfo) => {
  const { email, password } = userInfo;
  if (!email) {
    return {
      field: "email",
      message: "Email is required",
    };
  }
  if (!password) {
    return {
      field: "password",
      message: "Password is required",
    };
  }

  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegExp.test(String(email).toLocaleLowerCase().trim())) {
    return {
      field: "email",
      message: "Plese enter valid email",
    };
  }

  return true;
};
