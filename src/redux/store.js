import { LanguagePreferenceReducer } from "./states/languagePreference";
import { UserSessionReducer } from "./states/userSession";
import { ColorModeReducer } from "./states/colorMode";
import { configureStore } from "@reduxjs/toolkit";

const reduxStore = configureStore({
  reducer: {
    languagePreference: LanguagePreferenceReducer,
    userSession: UserSessionReducer,
    colorMode: ColorModeReducer,
  },
});

export { reduxStore };
