import { setLanguagePreference } from "../../redux/states/languagePreference";
import { logger, MMKV_LNG, storage } from "../../config/app.config";
import * as Localization from "expo-localization";
import { reduxStore } from "../../redux/store";

const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async callback => {
    try {
      const storedLanguage = storage.getString(MMKV_LNG);
      if (storedLanguage) {
        logger("Stored language:", storedLanguage);
        reduxStore.dispatch(setLanguagePreference({ language: storedLanguage }));
        return callback(storedLanguage);
      }
      const { locale } = await Localization.getLocalizationAsync();
      logger("Not stored language, user preference:", locale);
      storage.set(MMKV_LNG, locale);
      reduxStore.dispatch(setLanguagePreference({ language: locale }));
      return callback(locale);
    } catch (err) {
      console.log("i18next: Error reading the language preferences", err);
    }
  },
  cacheUserLanguage: lng => {
    storage.set(MMKV_LNG, lng);
    reduxStore.dispatch(setLanguagePreference({ language: lng }));
  },
};

export { languageDetector };
