import { logger } from "../../config/app.config";
import Constants from "expo-constants";
import { t } from "i18next";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: Constants.manifest.extra.APP_API_URL });

const errorHandler = ({ request, response }) => {
  let error = t("components.errors.unexpected");

  if (response) {
    if (!response.data?.error) {
      logger(`${request?._method} ${response?.status} ${request?._url} : ${error}`);
      return { error };
    }

    logger(`${request?._method} ${response?.status} ${request?._url} : ${response.data.error}`);
    return response.data;
  }

  if (request) {
    error = t("components.errors.internetConnection");
  }

  logger(`${request?._method} ${response?.status} ${request?._url} : ${error}`);
  return { error };
};

const errorHandlerSWR = ({ request, response }) => {
  let error = t("components.errors.unexpected");

  if (response) {
    if (!response.data?.error) {
      logger(`${request?._method} ${response?.status} ${request?._url} : ${error}`);
      throw error;
    }

    logger(`${request?._method} ${response?.status} ${request?._url} : ${response.data.error}`);
    throw response.data.error;
  }

  if (request) {
    error = t("components.errors.internetConnection");
  }

  logger(`${request?._method} ${response?.status} ${request?._url} : ${error}`);
  throw error;
};

export { axiosInstance, errorHandler, errorHandlerSWR };
