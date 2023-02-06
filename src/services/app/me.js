import { axiosInstance, errorHandler, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWR from "swr";

const accountInformationUrl = "/me/account";
const adventuresUrl = "/me/adventures";

const getAccountInformation = async url => {
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

const getUserAdventures = async url => {
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

const updateAccountInformation = async payload => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .patch(accountInformationUrl, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

const useAccountInformation = () => useSWR(accountInformationUrl, getAccountInformation);
const useUserAdventures = () => useSWR(adventuresUrl, getUserAdventures);

export { updateAccountInformation, useAccountInformation, useUserAdventures };
