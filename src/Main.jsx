import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { Home } from "./screens/Home";

function Main() {
  const { isDark } = useSelector(state => state.colorMode);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Home />
      {/* For full screen */}
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export { Main };
