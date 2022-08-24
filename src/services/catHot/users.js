import { reduxStore } from "../../redux/store";
import { axiosCatHot } from "./axios.config";

const createUser = () => {
  const { signUpForm: data } = reduxStore.getState();
  console.log(data);

  return new Promise((resolve, reject) => {
    axiosCatHot
      .post("/users", data)
      .then(({ data }) => resolve(data))
      .catch(({ request, response }) => {
        if (response) {
          if (!response.token) {
            resolve({
              error: "Unexpected error ocurred",
            });
          }
          resolve({
            status: response.status,
            ...response.data,
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

export { createUser };
