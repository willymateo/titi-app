import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { BottomTabsNavigator } from "./components/BottomTabsNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { Login } from "./screens/Login";

const Stack = createNativeStackNavigator();

function Main() {
  const { isDark } = useSelector(state => state.colorMode);
  const { userId } = useSelector(state => state.userSession);

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <StatusBar style={isDark ? "light" : "dark"} />
        {userId ? (
          <BottomTabsNavigator />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

export { Main };
