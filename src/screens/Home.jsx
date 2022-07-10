import { setColorMode } from "../redux/states/colorMode";
import { useSelector, useDispatch } from "react-redux";
import { Text, Switch } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function Home() {
  const { isDark } = useSelector(state => state.colorMode);
  const dispatch = useDispatch();

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
      <Text variant="displayLarge">Home Screen</Text>
      <Text>{isDark ? "Dark" : "Light"} mode</Text>
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
