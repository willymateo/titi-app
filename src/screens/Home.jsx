import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { setColorMode } from "../redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import { Text, Switch } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function Home() {
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
    <View style={viewStyle.container}>
      {fontsLoaded ? (
        <Text style={{ fontFamily: "Pacifico400Regular" }}>{isDark ? "Dark" : "Light"} mode</Text>
      ) : (
        <Text>{isDark ? "Dark" : "Light"} mode without google font</Text>
      )}
      <Switch value={isDark} onValueChange={switchHandler}></Switch>
    </View>
  );
}

const viewStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Home };
