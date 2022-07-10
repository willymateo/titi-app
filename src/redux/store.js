import { UserSessionReducer } from "./states/userSession";
import { ColorModeReducer } from "./states/colorMode";
import { configureStore } from "@reduxjs/toolkit";

const storeConfiguration = configureStore({
  reducer: {
    colorMode: ColorModeReducer,
    userSession: UserSessionReducer,
  },
});

export { storeConfiguration };
