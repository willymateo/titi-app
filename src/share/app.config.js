import { MMKV } from "react-native-mmkv";
import Constants from "expo-constants";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;

const MMKV_LNG = "languagePreference.language";
const MMKV_USER_TOKEN = "userSession.token";
const MMKV_IS_DARK = "colorMode.isDark";
const MMKV_THEME = "colorMode.theme";
const storage = new MMKV({
  id: Constants.manifest2.extra.MMKV_ID,
  encryptionKey: Constants.manifest2.extra.MMKV_KEY,
});

const logger = (...args) => {
  if (Constants.manifest2.extra.APP_ENV === "development") {
    console.log(...args);
  }
};

export {
  logger,
  storage,
  MMKV_LNG,
  MMKV_THEME,
  EMAIL_REGEX,
  MMKV_IS_DARK,
  USERNAME_REGEX,
  MMKV_USER_TOKEN,
};
