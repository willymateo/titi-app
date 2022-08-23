import { logger, MMKV_IS_DARK, MMKV_THEME, MMKV_USER_TOKEN, storage } from "./share/app.config";
import { MainBottomTabsNavigator } from "./components/navigation/MainBottomTabsNavigator";
import { WelcomeStackNavigator } from "./components/navigation/WelcomeStackNavigator";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { setUserSession } from "./redux/states/userSession";
import { setColorMode } from "./redux/states/colorMode";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { IntlProvider } from "react-intl";
import { useEffect } from "react";

function Main() {
  const { language } = useSelector(state => state.languagePreference);
  const { isDark, theme } = useSelector(state => state.colorMode);
  const { token } = useSelector(state => state.userSession);
  const storedToken = storage.getString(MMKV_USER_TOKEN);
  const storedIsDark = storage.getBoolean(MMKV_IS_DARK);
  const storedTheme = storage.getString(MMKV_THEME);
  const dispatch = useDispatch();

  useEffect(() => {
    if (storedTheme && storedIsDark !== undefined) {
      logger("Stored isDark:", storedIsDark);
      logger("Stored theme:", storedTheme);
      dispatch(setColorMode({ theme: storedTheme, isDark: storedIsDark }));
      return;
    }
    logger("No stored isDark, using default:", isDark);
    logger("No stored theme, using default:", theme);
    storage.set(MMKV_IS_DARK, isDark);
    storage.set(MMKV_THEME, theme);
  }, []);

  useEffect(() => {
    if (storedToken) {
      logger("Stored token:", storedToken);
      dispatch(setUserSession({ token: storedToken }));
      return;
    }
    if (token) {
      storage.set(MMKV_USER_TOKEN, token);
    }
  }, []);

  return (
    <IntlProvider locale={language}>
      <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationContainer theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
          <StatusBar style={theme} />
          {!token ? <MainBottomTabsNavigator /> : <WelcomeStackNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </IntlProvider>
  );
}

export { Main };
