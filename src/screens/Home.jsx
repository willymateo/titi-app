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
    <View style={styles.container}>
      <Text variant="displayLarge">Home Screen</Text>
      <Text>{isDark ? "Dark" : "Light"} mode</Text>
      <Switch value={isDark} onValueChange={switchHandler}></Switch>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Home };
