export const constractSearchParams = (text) => {
  const params = {};

  if (text) {
    params.header = text;
  }
  return params;
};
