import { axiosCatHot } from "./axios.config";

const getAllGenders = () => {
  return new Promise((resolve, reject) => {
    axiosCatHot
      .get("/genders")
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

export { getAllGenders };
