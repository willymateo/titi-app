import { axiosInstance, errorHandler, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWR from "swr";

const accountInformationUrl = "/me/account";
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

const useAccountInformation = () => useSWR(accountInformationUrl, getAccountInformation);

const updateAccountInformation = async payload => {
  const {
    userSession: { token },
  } = reduxStore.getState();

  return axiosInstance
    .put(accountInformationUrl, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => data)
    .catch(errorHandler);
};

export { updateAccountInformation, useAccountInformation };
