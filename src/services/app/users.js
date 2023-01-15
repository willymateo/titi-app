import { axiosInstance, errorHandler } from "./axios.config";
import { reduxStore } from "../../redux/store";

const createUser = async () => {
  const { signUpForm: payload } = reduxStore.getState();

  return axiosInstance
    .post("/users", payload)
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { createUser };
