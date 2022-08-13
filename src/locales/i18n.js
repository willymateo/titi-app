import { translationEn } from "./en/translation";
import { translationEs } from "./es/translation";
import { initReactI18next } from "react-i18next";
import Constants from "expo-constants";
import i18next from "i18next";
import "intl-pluralrules";

i18next.use(initReactI18next).init({
  debug: Constants.manifest.extra.APP_ENV === "development",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: translationEn,
    },
    es: {
      translation: translationEs,
    },
  },
});

export { i18next };
