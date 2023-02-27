import { MMKV } from "react-native-mmkv";
import Constants from "expo-constants";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;
const ADVENTURE_START_TIME_MINUTES_WINDOW = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_MIN_LENGTH = 5;
const PASSWORD_MIN_LENGTH = 8;

const MMKV_LNG = "languagePreference.language";
const MMKV_USER_TOKEN = "userSession.token";
const MMKV_IS_DARK = "colorMode.isDark";
const MMKV_THEME = "colorMode.theme";
const storage = new MMKV({
  id: Constants.manifest.extra.MMKV_ID,
  encryptionKey: Constants.manifest.extra.MMKV_KEY,
});

const logger = (...args) => {
  if (Constants.manifest.extra.APP_ENV === "development") {
    console.log(...args);
  }
};

export {
  ADVENTURE_START_TIME_MINUTES_WINDOW,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  MMKV_USER_TOKEN,
  USERNAME_REGEX,
  MMKV_IS_DARK,
  EMAIL_REGEX,
  MMKV_THEME,
  MMKV_LNG,
  storage,
  logger,
};
