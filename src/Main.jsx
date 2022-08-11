import { MainBottomTabsNavigator } from "./components/navigation/MainBottomTabsNavigator";
import { WelcomeStackNavigator } from "./components/navigation/WelcomeStackNavigator";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import "./locales/i18n";

function Main() {
  const { isDark } = useSelector(state => state.colorMode);
  const { token } = useSelector(state => state.userSession);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        {token ? <MainBottomTabsNavigator /> : <WelcomeStackNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export { Main };
