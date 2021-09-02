export const constractSearchParams = (text) => {
  const params = {
    select: "header,body.blocks",
  };

  if (text) {
    params.search = { text, fields: ["header", "body"] };
  }
  return params;
};
