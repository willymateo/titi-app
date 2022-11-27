import "expo-dev-client";

import { Eczar_400Regular as Eczar400Regular } from "@expo-google-fonts/eczar";
import { Provider as ReduxProvider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { reduxStore } from "./src/redux/store";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { Main } from "./src/Main";
import "./src/locales/i18n";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RedHatMono: require("./assets/fonts/RedHatMono-VariableFont_wght.ttf"),
    Eczar400Regular,
  });

  const handleReadyLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={reduxStore}>
      <Main onLayout={handleReadyLayout} />
    </ReduxProvider>
  );
}
