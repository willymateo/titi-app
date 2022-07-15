import { InitialStackNavigator } from "./components/InitialStackNavigator";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { BottomTabsNavigator } from "./components/BottomTabsNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

function Main() {
  const { isDark } = useSelector(state => state.colorMode);
  const { token } = useSelector(state => state.userSession);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        {token ? <BottomTabsNavigator /> : <InitialStackNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}

export { Main };
