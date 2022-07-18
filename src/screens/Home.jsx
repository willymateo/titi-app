import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Home() {
  return (
    <View style={styles.container}>
      <Text variant="displayLarge">Home Screen</Text>
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

export { Home };
