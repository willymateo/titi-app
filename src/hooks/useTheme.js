import { useSelector } from "react-redux";
import {
  DefaultTheme as NavigationOriginalLightTheme,
  DarkTheme as NavigationOriginalDarkTheme,
} from "@react-navigation/native";
import {
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";

const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationOriginalLightTheme,
  reactNavigationDark: NavigationOriginalDarkTheme,
});

const CombinedLightTheme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
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
  const { isDark } = useSelector(({ colorMode }) => colorMode);
  const paperTheme = isDark ? CombinedDarkTheme : CombinedLightTheme;

  return { paperTheme };
};

export { useTheme };
