import { ColorModeReducer } from "./states/colorMode";
import { configureStore } from "@reduxjs/toolkit";

const storeConfiguration = configureStore({
  reducer: {
    colorMode: ColorModeReducer,
  },
});

export { storeConfiguration };
