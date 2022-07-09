import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function Login() {
  return (
    <View style={viewStyle.container}>
      <Text>Login screen</Text>
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

export { Login };
