import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  language: "en",
};

const LanguagePreferenceSlice = createSlice({
  name: "languagePreference",
  initialState: emptyState,
  reducers: {
    createLanguagePreference: ({ action: { payload } }) => payload,
    setLanguagePreference: (state, { payload }) => ({ ...state, ...payload }),
    resetLanguagePreference: () => emptyState,
  },
});

const LanguagePreferenceReducer = LanguagePreferenceSlice.reducer;
const { createLanguagePreference, setLanguagePreference, resetLanguagePreference } =
  LanguagePreferenceSlice.actions;

export {
  setLanguagePreference,
  resetLanguagePreference,
  createLanguagePreference,
  LanguagePreferenceReducer,
};
