import { LoginFooter } from "../components/LoginFooter";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome screen</Text>
      <View>
        <Button mode="contained" uppercase={false} onPress={() => navigation.navigate("Login")}>
          Log in
        </Button>
        <Button mode="contained" uppercase={false} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Button>
      </View>
      <LoginFooter onPressAccountRecovery={() => navigation.navigate("AccountRecovery")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export { Welcome };
