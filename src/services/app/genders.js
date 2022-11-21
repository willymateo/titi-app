import { axiosInstance, axiosInstance, errorHandlerSWR } from "./axios.config";
import useSWR from "swr";

const getAllGendersUrl = "/genders";
const getAllGenders = async url =>
  axiosInstance
    .get(url)
    .then(({ data }) => data)
    .catch(errorHandlerSWR);

const useGenders = () => {
  const response = useSWR(getAllGendersUrl, getAllGenders);
  return response;
};

export { getAllGenders, getAllGendersUrl, useGenders };
