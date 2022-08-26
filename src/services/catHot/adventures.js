import { axiosCatHot, errorHandlerSWR } from "./axios.config";
import useSWR from "swr";

const getAllAdventuresUrl = "/adventures";
const getAllAdventures = async url => {
  axiosCatHot
    .get(url)
    .then(({ data }) => data)
    .catch(errorHandlerSWR);
};

const useAdventures = () => {
  const response = useSWR(getAllAdventuresUrl, getAllAdventures);
  return response;
};

export { getAllAdventures, getAllAdventuresUrl, useAdventures };
