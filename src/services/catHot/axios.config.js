import Constants from "expo-constants";
import axios from "axios";

const axiosCatHot = axios.create({
  baseURL: Constants.manifest.extra.CATHOT_API_URL,
});

export { axiosCatHot };
