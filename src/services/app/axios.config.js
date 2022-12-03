import Constants from "expo-constants";
import axios from "axios";
import { logger } from "../../config/app.config";

const axiosInstance = axios.create({
  baseURL: Constants.manifest.extra.APP_API_URL,
});

const errorHandler = ({ request, response }) => {
  let error = "Unexpected error ocurred";

  if (response) {
    if (!response.data?.error) {
      logger(`${request._method} ${response.status} ${request.responseURL} : ${error}`);
      return { error };
    }

    logger(`${request._method} ${response.status} ${request.responseURL} : ${response.data.error}`);
    return response.data;
  }

  if (request) {
    error = "The request was made but no response was received";
  }

  logger(`${request._method} ${response.status} ${request.responseURL} : ${error}`);
  return { error };
};

const errorHandlerSWR = ({ request, response }) => {
  let error = "Unexpected error ocurred";

  if (response) {
    if (!response.data?.error) {
      logger(`${request._method} ${response.status} ${request.responseURL} : ${error}`);
      throw error;
    }

    logger(`${request._method} ${response.status} ${request.responseURL} : ${response.data.error}`);
    throw response.data.error;
  }

  if (request) {
    error = "The request was made but no response was received";
  }

  logger(`${request._method} ${response.status} ${request.responseURL} : ${error}`);
  throw error;
};

export { axiosInstance, errorHandler, errorHandlerSWR };
