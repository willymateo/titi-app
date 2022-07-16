import { BASE_API_URL } from "../utilities/environment";
import axios from "axios";

axios.defaults.baseURL = BASE_API_URL;

// ====================================================================================================================
// Create user
const createUser = async data => {
  try {
    const { data: response } = await axios.post("/users", {});
    return response;
  } catch (err) {
    console.log(err);
    return {
      err: "Could not be created the user",
    };
  }
};
// ====================================================================================================================

const catHotAPI = {
  createUser,
};

export { catHotAPI };
