import { createSlice } from "@reduxjs/toolkit";

const colorModoEmptyState = {
  theme: "light",
  isDark: false,
};

const ColorModeSlice = createSlice({
  name: "colorMode",
  initialState: colorModoEmptyState,
  reducers: {
    createColorMode: (state, action) => action.payload,
    setColorMode: (state, action) => ({ ...state, ...action.payload }),
    resetColorMode: () => colorModoEmptyState,
  },
});

const { createColorMode, setColorMode, resetColorMode } = ColorModeSlice.actions;

const ColorModeReducer = ColorModeSlice.reducer;

export { ColorModeReducer, createColorMode, setColorMode, resetColorMode };
