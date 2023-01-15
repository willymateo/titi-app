import { LanguagePreferenceReducer } from "./states/languagePreference";
import { UserSessionReducer } from "./states/userSession";
import { SignUpFormReducer } from "./states/signUpForm";
import { ColorModeReducer } from "./states/colorMode";
import { configureStore } from "@reduxjs/toolkit";

const reduxStore = configureStore({
  reducer: {
    languagePreference: LanguagePreferenceReducer,
    userSession: UserSessionReducer,
    signUpForm: SignUpFormReducer,
    colorMode: ColorModeReducer,
  },
});

export { reduxStore };
