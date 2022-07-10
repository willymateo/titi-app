import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Profile() {
  return (
    <View style={styles.container}>
      <Text>Profile screen</Text>
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

export { Profile };
