import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  username: null,
  password: null,
  email: null,
  phone: {
    phoneNumber: null,
    countryCode: 593,
  },
  location: {
    // latitude: null,
    // longitude: null,
    latitude: "3196727",
    longitude: "6943923",
  },
  profileInformation: {
    bornDate: null,
    idGender: null,
  },
};

const SignUpFormSlice = createSlice({
  name: "signUpForm",
  initialState: emptyState,
  reducers: {
    createSignUpForm: ({ action }) => action.payload,
    setSignUpForm: (state, action) => ({
      ...state,
      ...action.payload,
      phone: {
        ...state.phone,
        ...action.payload.phone,
      },
      location: {
        ...state.location,
        ...action.payload.location,
      },
      profileInformation: {
        ...state.profileInformation,
        ...action.payload.profileInformation,
      },
    }),
    resetSignUpForm: () => emptyState,
  },
});

const { createSignUpForm, setSignUpForm, resetSignUpForm } = SignUpFormSlice.actions;
const SignUpFormReducer = SignUpFormSlice.reducer;

export { createSignUpForm, setSignUpForm, resetSignUpForm, SignUpFormReducer };
