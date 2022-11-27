import { axiosInstance, errorHandlerSWR } from "./axios.config";
import { reduxStore } from "../../redux/store";
import useSWRImmutable from "swr/immutable";

const getAccountInformationUrl = "/me/account";
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

const useAccountInformation = () =>
  useSWRImmutable(getAccountInformationUrl, getAccountInformation);

export { getAccountInformation, useAccountInformation, getAccountInformationUrl };
