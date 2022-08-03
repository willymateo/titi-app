import Constants from "expo-constants";
import axios from "axios";

axios.defaults.baseURL = Constants.manifest.extra.CATHOT_API_URL;

const login = ({ username, password }) => {
  return new Promise(resolve => {
    axios
      .post("/auth/login", { username, password })
      .then(({ data }) => resolve(data))
      .catch(({ request, response }) => {
        if (response) {
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

export { login };
