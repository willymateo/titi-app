import { logger, MMKV_IS_DARK, MMKV_THEME, MMKV_USER_TOKEN, storage } from "./config/app.config";
import { MainBottomTabsNavigator } from "./screens/mainTabs/BottomTabs";
import { WelcomeStackNavigator } from "./screens/welcome/Stack";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { setUserSession } from "./redux/states/userSession";
import { setColorMode } from "./redux/states/colorMode";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "./hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { IntlProvider } from "react-intl";
import { useEffect } from "react";

function Main({ onLayout }) {
  const { language } = useSelector(({ languagePreference }) => languagePreference);
  const { isDark, theme } = useSelector(({ colorMode }) => colorMode);
  const { token } = useSelector(({ userSession }) => userSession);
  const storedToken = storage.getString(MMKV_USER_TOKEN);
  const storedIsDark = storage.getBoolean(MMKV_IS_DARK);
  const storedTheme = storage.getString(MMKV_THEME);
  const { paperTheme } = useTheme();
  const dispatch = useDispatch();

  const verifyThemeCache = () => {
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
  };

  const verifyTokenCache = () => {
    if (storedToken) {
      logger("Stored token:", storedToken);
      dispatch(setUserSession({ token: storedToken }));
      return;
    }
    if (token) {
      storage.set(MMKV_USER_TOKEN, token);
    }
  };

  useEffect(() => {
    verifyThemeCache();
    verifyTokenCache();
  }, []);

  return (
    <IntlProvider locale={language}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={paperTheme} onReady={onLayout}>
          <StatusBar style={theme} translucent={false} animated />
          {token ? <MainBottomTabsNavigator /> : <WelcomeStackNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </IntlProvider>
  );
}

export { Main };
