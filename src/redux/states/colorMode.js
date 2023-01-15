import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  theme: "dark",
  isDark: true,
};

const ColorModeSlice = createSlice({
  name: "colorMode",
  initialState: emptyState,
  reducers: {
    createColorMode: ({ action: { payload } }) => payload,
    setColorMode: (state, { payload }) => ({ ...state, ...payload }),
    resetColorMode: () => emptyState,
  },
});

const { createColorMode, setColorMode, resetColorMode } = ColorModeSlice.actions;
const ColorModeReducer = ColorModeSlice.reducer;

export { ColorModeReducer, createColorMode, setColorMode, resetColorMode };
