import { axiosInstance, errorHandlerSWR } from "./axios.config";
import useSWRImmutable from "swr/immutable";

const getAllGendersUrl = "/genders";
const getAllGenders = async url =>
  axiosInstance
    .get(url)
    .then(({ data }) => data)
    .catch(errorHandlerSWR);

const useGenders = () => useSWRImmutable(getAllGendersUrl, getAllGenders);

export { getAllGenders, getAllGendersUrl, useGenders };
