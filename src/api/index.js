const DEFAULT_URL = "https://www.googleapis.com/books/v1/volumes?";

function setParams(params) {
  const queries = params || {};
  const queriesObject = Object.assign(queries, {
    key: process.env.VUE_APP_API_KEY,
    q: "Elizabeth+Bennet",
  });

  return new URLSearchParams(queriesObject);
}

const getBooksFromParams = (params) => {
  const stringParams = `${DEFAULT_URL}${setParams(params).toString()}`;
  console.log("stringParams", stringParams);
  return fetch(stringParams);
};

export default getBooksFromParams;
