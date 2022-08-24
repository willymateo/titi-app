import { axiosCatHot, errorHandler } from "./axios.config";

const getAllGenders = async () =>
  axiosCatHot
    .get("/genders")
    .then(({ data }) => data)
    .catch(errorHandler);

export { getAllGenders };
