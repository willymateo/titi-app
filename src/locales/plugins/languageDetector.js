import * as Localization from "expo-localization";

const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async callback => {
    try {
      const { locale } = await Localization.getLocalizationAsync();
      console.log("Setting the language preference:", locale);
      return callback(locale);
    } catch (err) {
      console.log("i18next: Error reading the language preferences", err);
    }
  },
  cacheUserLanguage: lng => {},
};

export { languageDetector };
