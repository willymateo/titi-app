import { axiosInstance, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWR from "swr";

const getAllAdventuresUrl = "/adventures";
const getAllAdventures = async url => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandlerSWR);
};

const useAdventures = () => useSWR(getAllAdventuresUrl, getAllAdventures);

export { getAllAdventures, getAllAdventuresUrl, useAdventures };
