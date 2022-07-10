import { Button, Divider, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function LoginFooter({ onPressLogin, onPressSignUp, onPressAccountRecovery }) {
  return (
    <>
      {onPressLogin && (
        <>
          <View style={styles.flexRow}>
            <Text>Already have an account?</Text>
            <Button mode="Text" uppercase={false} onPress={onPressLogin}>
              Login
            </Button>
          </View>
          <Divider />
        </>
      )}

      {onPressAccountRecovery && (
        <>
          <View style={styles.flexRow}>
            <Text>Forgot your password?</Text>
            <Button mode="text" uppercase={false} onPress={onPressAccountRecovery}>
              Recover account
            </Button>
          </View>
          <Divider />
        </>
      )}

      {onPressSignUp && (
        <View style={styles.flexRow}>
          <Text>Don't have an account?</Text>
          <Button mode="Text" uppercase={false} onPress={onPressSignUp}>
            Sign up
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { LoginFooter };
