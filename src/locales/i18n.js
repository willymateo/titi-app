// Polyfills
// Is important the order
// TODO: Check if in the newest version of react native are necesaries
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/locale-data/en";
import "@formatjs/intl-pluralrules/locale-data/es";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";
import "@formatjs/intl-numberformat/locale-data/es";
import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/locale-data/en";
import "@formatjs/intl-datetimeformat/locale-data/es";

import { languageDetector } from "./plugins/languageDetector";
import { translationEn } from "./en/translation";
import { translationEs } from "./es/translation";
import { initReactI18next } from "react-i18next";
import Constants from "expo-constants";
import i18next from "i18next";

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    debug: Constants.manifest2.extra.APP_ENV === "development",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
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

export default i18next;
