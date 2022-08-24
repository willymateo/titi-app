import { axiosCatHot, errorHandler } from "./axios.config";

const login = async ({ username, password }) =>
  axiosCatHot
    .post("/auth/login", { username, password })
    .then(({ data }) => data)
    .catch(errorHandler);

export { login };
