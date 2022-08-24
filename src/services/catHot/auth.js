import { axiosCatHot } from "./axios.config";

const login = ({ username, password }) => {
  console.log(username, password);

  return new Promise((resolve, reject) => {
    axiosCatHot
      .post("/auth/login", { username, password })
      .then(({ data }) => resolve(data))
      .catch(({ request, response }) => {
        if (response) {
          if (!response.data?.error) {
            resolve({
              status: response.status,
              error: "Unexpected error ocurred",
            });
          }
          resolve({
            ...response.data,
            status: response.status,
          });
        } else if (request) {
          resolve({
            error: "The request was made but no response was received",
          });
        } else {
          resolve({
            error: "Unexpected error ocurred",
          });
        }
      });
  });
};

export { login };
