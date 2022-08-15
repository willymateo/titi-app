import { MMKV } from "react-native-mmkv";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const USERNAME_REGEX = /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/;

const MMKV_LNG = "languagePreference.language";
const MMKV_USER_TOKEN = "userSession.token";
const MMKV_THEME = "colorMode.theme";
const MMKV_IS_DARK = "colorMode.isDark";
const storage = new MMKV();

export {
  storage,
  MMKV_LNG,
  MMKV_THEME,
  EMAIL_REGEX,
  MMKV_IS_DARK,
  USERNAME_REGEX,
  MMKV_USER_TOKEN,
};
