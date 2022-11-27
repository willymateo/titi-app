import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
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
  const [theme, setTheme] = useState(CombinedDefaultTheme);

  const toggleTheme = () => {
    setTheme(theme.dark ? CombinedDefaultTheme : CombinedDarkTheme);
  };

  return { theme, toggleTheme };
};

export { useTheme };
