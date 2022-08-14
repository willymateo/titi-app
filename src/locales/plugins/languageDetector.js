import { setLanguagePreference } from "../../redux/states/languagePreference";
import { MMKV_LNG, storage } from "../../share/app.config";
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
        console.log("Stored language:", storedLanguage);
        reduxStore.dispatch(setLanguagePreference({ language: storedLanguage }));
        return callback(storedLanguage);
      }
      console.log("Not stored language yet");
      const { locale } = await Localization.getLocalizationAsync();
      storage.set(MMKV_LNG, locale);
      return callback(locale);
    } catch (err) {
      console.log("i18next: Error reading the language preferences", err);
    }
  },
  cacheUserLanguage: lng => {
    storage.set(MMKV_LNG, lng);
  },
};

export { languageDetector };
