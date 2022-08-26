import Constants from "expo-constants";
import axios from "axios";

const axiosCatHot = axios.create({
  baseURL: Constants.manifest.extra.CATHOT_API_URL,
});

const errorHandler = ({ request, response }) => {
  if (response) {
    if (!response.data?.error) {
      return {
        status: response.status,
        error: "Unexpected error ocurred",
      };
    }
    return {
      ...response.data,
      status: response.status,
    };
  } else if (request) {
    return {
      error: "The request was made but no response was received",
    };
  } else {
    return {
      error: "Unexpected error ocurred",
    };
  }
};

const errorHandlerSWR = ({ request, response }) => {
  if (response) {
    if (!response.data?.error) {
      throw "Unexpected error ocurred";
    }
    throw response.data.error;
  } else if (request) {
    throw "The request was made but no response was received";
  } else {
    throw "Unexpected error ocurred";
  }
};

export { axiosCatHot, errorHandler, errorHandlerSWR };
