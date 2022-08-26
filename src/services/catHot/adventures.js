import { axiosCatHot, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWR from "swr";

const getAllAdventuresUrl = "/adventures";
const getAllAdventures = async url => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosCatHot
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandlerSWR);
};

const useAdventures = () => {
  const response = useSWR(getAllAdventuresUrl, getAllAdventures);
  return response;
};

export { getAllAdventures, getAllAdventuresUrl, useAdventures };
