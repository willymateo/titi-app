import Constants from "expo-constants";
import axios from "axios";

axios.defaults.baseURL = Constants.manifest.extra.CATHOT_API_URL;

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

// ====================================================================================================================
// Login
const login = async ({ username, password }) => {
  try {
    const { data: response } = await axios.post("/auth/login", { username, password });
    return response;
  } catch (err) {
    console.log(err);
    return {
      err: "Could not be login",
    };
  }
};
// ====================================================================================================================
export default { createUser, login };
