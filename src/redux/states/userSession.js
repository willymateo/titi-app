import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  token: null,
  id: null,
  username: "",
  password: "",
  firstNames: "",
  lastNames: "",
  email: "",
  photoUrl: "https://github.com/willymateo.png",
  biography: "",
  bornDate: "",
  idGender: null,
  location: {
    latitude: null,
    longitude: null,
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
