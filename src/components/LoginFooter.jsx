import { Button, Divider, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

function LoginFooter({ onPressLogin, onPressSignUp, onPressAccountRecovery, style }) {
  return (
    <View style={style}>
      {onPressLogin && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>Already have an account?</Text>
            <Button mode="Text" uppercase={false} onPress={onPressLogin}>
              Login
            </Button>
          </View>
        </>
      )}

      {onPressAccountRecovery && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>Forgot your password?</Text>
            <Button mode="text" uppercase={false} onPress={onPressAccountRecovery}>
              Recover account
            </Button>
          </View>
        </>
      )}

      {onPressSignUp && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>Don't have an account?</Text>
            <Button mode="Text" uppercase={false} onPress={onPressSignUp}>
              Sign up
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export { LoginFooter };
