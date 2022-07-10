import { LoginFooter } from "../components/LoginFooter";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

function AccountRecovery({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Account Recovery Screen</Text>
      <LoginFooter
        onPressLogin={() => navigation.popToTop()}
        onPressSignUp={() => navigation.navigate("SignUp")}
      />
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

export { AccountRecovery };
