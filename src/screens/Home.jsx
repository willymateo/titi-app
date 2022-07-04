import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { setColorMode } from "../redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { Text, Switch } from "react-native-paper";
import { useEffect } from "react";

function Home() {
  const { isDark } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
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

  // useEffect(() => {
  // const prepare = async () => {
  // await SplashScreen.preventAutoHideAsync();
  // };
  // prepare();
  // });

  return (
    <>
      {fontsLoaded ? (
        <Text style={{ fontFamily: "Pacifico400Regular" }}>{isDark ? "Dark" : "Light"} mode</Text>
      ) : (
        <Text>{isDark ? "Dark" : "Light"} mode without google font</Text>
      )}
      <Switch value={isDark} onValueChange={switchHandler}></Switch>
    </>
  );
}

export { Home };
