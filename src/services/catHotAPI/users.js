import Constants from "expo-constants";
import axios from "axios";

axios.defaults.baseURL = Constants.manifest.extra.CATHOT_API_URL;

const createUser = ({ username, password, email, phoneNumber, bornDate }) => {
  const data = {
    username,
    password,
    email,
    phone: {
      countryCode: 593,
      phoneNumber,
    },
    location: {
      latitude: "3196727",
      longitude: "6943923",
    },
    profileInformation: {
      bornDate,
    },
  };

  return new Promise(resolve => {
    axios
      .post("/users", data)
      .then(({ data }) => resolve(data))
      .catch(({ request, response }) => {
        if (response) {
          resolve({
            status: response.status,
            ...response.data,
          });
        } else if (request) {
          resolve({
            error: "The request was made but no response was received",
          });
        } else {
          resolve({
            error: "Unexpected error ocurred",
          });
        }
      });
  });
};

export { createUser };
