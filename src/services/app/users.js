import { axiosInstance, errorHandler } from "./axios.config";
import { reduxStore } from "../../redux/store";

const createUser = async () => {
  const { signUpForm: data } = reduxStore.getState();

  return axiosInstance
    .post("/users", data)
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { createUser };
