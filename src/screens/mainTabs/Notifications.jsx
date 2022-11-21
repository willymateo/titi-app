import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Notifications() {
  return (
    <View style={styles.container}>
      <Text>You don't have notifications yet</Text>
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

export { Notifications };
