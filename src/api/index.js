const DEFAULT_URL = "https://www.googleapis.com/books/v1/volumes";

const setParams = (params) => {
  const queries = params || {};
  const queriesObject = Object.assign(
    {
      key: process.env.VUE_APP_API_KEY,
      maxResults: 30,
      q: "",
    },
    queries
  );

  return new URLSearchParams(queriesObject);
};

const getBooksFromParams = (params) => {
  const setedParams = decodeURIComponent(setParams(params).toString());
  const stringParams = `${DEFAULT_URL}?${setedParams}`;

  return fetch(stringParams);
};

export const getSingleBook = (id) => {
  const stringParams = `${DEFAULT_URL}/${id}?key=${process.env.VUE_APP_API_KEY}`;

  return fetch(stringParams);
};

export default getBooksFromParams;
