import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
  mode: "adaptive",
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
  mode: "adaptive",
};

const useTheme = () => {
  const { isDark } = useSelector(state => state.colorMode);
  return isDark ? CombinedDarkTheme : CombinedDefaultTheme;
};

export { useTheme };
