export const isValidUserInfo = (userInfo) => {
  const { name, email, password } = userInfo;
  if (!name) {
    return {
      field: "name",
      message: "User name is required",
    };
  }
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
  if (name.length < 3)
    return {
      field: "name",
      message: "Username can't be less than 3 letters",
    };

  const nameRegExp = /^\d+$/;

  if (nameRegExp.test(name)) {
    return {
      field: "name",
      message: "Username should not contian numbers",
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

  if (password.length < 8) {
    return {
      field: "password",
      message: "Password should not be less than 8 chars",
    };
  }

  return true;
};
