import { axiosInstance, errorHandler } from "./axios.config";
import { reduxStore } from "../../redux/store";

const createUser = async () => {
  const { userSession: payload } = reduxStore.getState();

  return axiosInstance
    .post("/users", {
      ...payload,
      token: undefined,
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { createUser };
