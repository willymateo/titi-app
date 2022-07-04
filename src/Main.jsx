import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { Text, Switch, Provider as PaperProvider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./theme/theme";
import { setColorMode } from "./redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";

function Main() {
  const { isDark } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Pacifico400Regular,
  });

  const switchHandler = () => {
    dispatch(
      setColorMode({
        theme: isDark ? "light" : "dark",
        isDark: !isDark,
      })
    );
  };

  return (
    <PaperProvider theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme}>
      {fontsLoaded ? (
        <Text style={{ fontFamily: "Pacifico_400Regular" }}>Dark mode</Text>
      ) : (
        <Text>Hola</Text>
      )}
      <Switch value={isDark} onValueChange={switchHandler}></Switch>
      {/* For full screen */}
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export { Main };
