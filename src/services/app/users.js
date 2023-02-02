import { axiosInstance, errorHandler } from "./axios.config";

const createUser = payload =>
  axiosInstance
    .post("/users", payload)
    .then(({ data }) => data)
    .catch(errorHandler);

export { createUser };
