import { axiosInstance, errorHandlerSWR } from "./axios.config";
import { useTranslation } from "react-i18next";
import useSWRImmutable from "swr/immutable";

const getAllGendersUrl = "/genders";
const getAllGenders = url =>
  axiosInstance
    .get(url)
    .then(({ data }) => data)
    .catch(errorHandlerSWR);

const useGenders = () => {
  const { t } = useTranslation("translation", { keyPrefix: "components.gendersRadioButton" });
  const { data, error, isValidating } = useSWRImmutable(getAllGendersUrl, getAllGenders);
  let gendersObj = {};

  if (!error && !isValidating) {
    gendersObj = data.reduce((acc, { id, gender }) => ({ ...acc, [id]: t(gender) }), {});
  }

  return {
    isValidating,
    gendersObj,
    error,
    data,
  };
};

export { useGenders };
