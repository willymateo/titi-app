import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { BottomTabsNavigator } from "./components/BottomTabsNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

function Main() {
  const { isDark } = useSelector(state => state.colorMode);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <BottomTabsNavigator />
        {/* For full screen */}
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}

export { Main };
