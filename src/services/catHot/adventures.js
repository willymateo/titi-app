import { axiosCatHot, errorHandler } from "./axios.config";

const getAllAdventures = async () => {
  axiosCatHot
    .get("/adventures")
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { getAllAdventures };
