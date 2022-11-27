import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  photoUrl: "",
  biography: "",
  bornDate: "",
  idGender: null,
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
};

const SignUpFormSlice = createSlice({
  name: "signUpForm",
  initialState: emptyState,
  reducers: {
    createSignUpForm: ({ action: { payload } }) => payload,
    setSignUpForm: (state, { payload }) => ({
      ...state,
      ...payload,
      phone: {
        ...state.phone,
        ...payload.phone,
      },
      location: {
        ...state.location,
        ...payload.location,
      },
      profileInformation: {
        ...state.profileInformation,
        ...payload.profileInformation,
      },
    }),
    resetSignUpForm: () => emptyState,
  },
});

const { createSignUpForm, setSignUpForm, resetSignUpForm } = SignUpFormSlice.actions;
const SignUpFormReducer = SignUpFormSlice.reducer;

export { createSignUpForm, setSignUpForm, resetSignUpForm, SignUpFormReducer };
