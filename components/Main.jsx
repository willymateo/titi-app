import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-paper";

function Main() {
  return (
    <View style={styles.container}>
      <Text>CatHot</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Main };
