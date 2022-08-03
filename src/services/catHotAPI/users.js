import Constants from "expo-constants";
import axios from "axios";
axios.defaults.baseURL = Constants.manifest.extra.CATHOT_API_URL;

const errorHandler = ({ request, response, ...err }) => {
  if (response) {
    console.log("The server responded with an error");
    resolve(response.data);
  } else if (request) {
    console.log("Error in the request");
    resolve(request);
  } else {
    console.log("Unexpected error ocurred");
    console.log(err);
    resolve({
      error: "Could not be login",
    });
  }
};

const createUser = async data => {
  try {
    const { data: response } = await axios.post("/users", data);
    return response;
  } catch (err) {
    err = err.toJSON();
    console.log(err);
    return {
      error: "Could not be created the user",
    };
  }
};

export { createUser };
