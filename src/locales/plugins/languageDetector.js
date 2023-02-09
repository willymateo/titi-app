import { setLanguagePreference } from "../../redux/states/languagePreference";
import { logger, MMKV_LNG, storage } from "../../config/app.config";
import * as Localization from "expo-localization";
import { reduxStore } from "../../redux/store";

const languageDetector = {
  type: "languageDetector",
  detect: () => {
    try {
      const storedLanguage = storage.getString(MMKV_LNG);

      if (storedLanguage) {
        reduxStore.dispatch(setLanguagePreference({ language: storedLanguage }));
        logger("Stored language:", storedLanguage);
        return storedLanguage;
      }

      const { languageCode } = Localization.getLocales()[0];
      logger("No stored language, using the user smarthphone preference:", languageCode);
      storage.set(MMKV_LNG, languageCode);
      reduxStore.dispatch(setLanguagePreference({ language: languageCode }));
      return languageCode;
    } catch (err) {
      console.log("i18next: Error reading the language preferences", err);
    }
  },
  cacheUserLanguage: lng => {
    storage.set(MMKV_LNG, lng);
    reduxStore.dispatch(setLanguagePreference({ language: lng }));
  },
  init: () => {},
  async: false,
};

export { languageDetector };
