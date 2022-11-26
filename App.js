import "expo-dev-client";

import { Eczar_400Regular as Eczar400Regular } from "@expo-google-fonts/eczar";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./src/redux/store";
import { Text } from "react-native-paper";
import { useFonts } from "expo-font";
import { Main } from "./src/Main";
import "./src/locales/i18n";

export default function App() {
  const [fontsLoaded] = useFonts({
    RedHatMono: require("./assets/fonts/RedHatMono-VariableFont_wght.ttf"),
    Eczar400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ReduxProvider store={reduxStore}>
      <Main />
    </ReduxProvider>
  );
}
