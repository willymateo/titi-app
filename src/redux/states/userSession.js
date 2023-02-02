import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  token: null,
  username: "",
  password: "",
  firstNames: "",
  lastNames: "",
  email: "",
  photoUrl: "https://github.com/willymateo.png",
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

const UserSessionSlice = createSlice({
  name: "userSession",
  initialState: emptyState,
  reducers: {
    createUserSession: ({ action: { payload } }) => payload,
    setUserSession: (state, { payload }) => ({
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
    }),
    resetUserSession: () => emptyState,
  },
});

const { createUserSession, setUserSession, resetUserSession } = UserSessionSlice.actions;
const UserSessionReducer = UserSessionSlice.reducer;

export { UserSessionReducer, createUserSession, setUserSession, resetUserSession };
