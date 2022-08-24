import { axiosCatHot, errorHandler } from "./axios.config";
import useSWR from "swr";

const getAllGendersUrl = "/genders";
const getAllGenders = async url =>
  axiosCatHot
    .get(url)
    .then(({ data }) => data)
    .catch(errorHandler);

const useGenders = () => {
  const response = useSWR(getAllGendersUrl, getAllGenders);
  return response;
};

export { getAllGenders, getAllGendersUrl, useGenders };
