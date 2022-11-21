import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  token: null,
};

const UserSessionSlice = createSlice({
  name: "userSession",
  initialState: emptyState,
  reducers: {
    createUserSession: ({ action }) => action.payload,
    setUserSession: (state, action) => ({ ...state, ...action.payload }),
    resetUserSession: () => emptyState,
  },
});

const { createUserSession, setUserSession, resetUserSession } = UserSessionSlice.actions;
const UserSessionReducer = UserSessionSlice.reducer;

export { UserSessionReducer, createUserSession, setUserSession, resetUserSession };
