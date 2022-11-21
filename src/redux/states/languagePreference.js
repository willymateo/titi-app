import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  language: "en",
};

const LanguagePreferenceSlice = createSlice({
  name: "languagePreference",
  initialState: emptyState,
  reducers: {
    createLanguagePreference: ({ action }) => action.payload,
    setLanguagePreference: (state, action) => ({ ...state, ...action.payload }),
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
