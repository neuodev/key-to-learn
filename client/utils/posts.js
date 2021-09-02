export const constractSearchParams = (text, urlSearch) => {
  const params = {
    select: "header,thumbnail,createdAt,updatedAt,domain,slug",
  };

  if (text) {
    params.search = { text, fields: ["header", "body"] };
  }
  return {
    ...params,
    ...urlSearch,
  };
};
