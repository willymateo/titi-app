import { axiosInstance, errorHandler, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWR from "swr";

const adventuresUrl = "/adventures";
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

const useAdventures = () => useSWR(adventuresUrl, getAllAdventures);

const createAdventure = async payload => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .post(adventuresUrl, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

const updateAdventureById = async ({ id, ...payload }) => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .patch(`${adventuresUrl}/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

const deleteAdventureById = async ({ id }) => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .delete(`${adventuresUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { useAdventures, createAdventure, updateAdventureById, deleteAdventureById };
