import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  token: null,
};

const UserSessionSlice = createSlice({
  name: "userSession",
  initialState: emptyState,
  reducers: {
    createUserSession: ({ action: { payload } }) => payload,
    setUserSession: (state, { payload }) => ({ ...state, ...payload }),
    resetUserSession: () => emptyState,
  },
});

const { createUserSession, setUserSession, resetUserSession } = UserSessionSlice.actions;
const UserSessionReducer = UserSessionSlice.reducer;

export { UserSessionReducer, createUserSession, setUserSession, resetUserSession };
