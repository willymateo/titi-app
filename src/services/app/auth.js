import { axiosInstance, errorHandler } from "./axios.config";

const login = async ({ username, password }) =>
  axiosInstance
    .post("/auth/login", { username, password })
    .then(({ data }) => data)
    .catch(errorHandler);

export { login };
