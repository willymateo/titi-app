import { Button, Divider, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

function LoginFooter({ onPressLogin, onPressSignUp, onPressAccountRecovery, style }) {
  const { t } = useTranslation();

  return (
    <View style={style}>
      {onPressLogin && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>{t("components.loginFooter.loginMessage")}</Text>
            <Button mode="Text" uppercase={false} onPress={onPressLogin}>
              {t("screens.welcome.login")}
            </Button>
          </View>
        </>
      )}

      {onPressAccountRecovery && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>{t("components.loginFooter.accountRecoveryMessage")}</Text>
            <Button mode="text" uppercase={false} onPress={onPressAccountRecovery}>
              {t("components.loginFooter.accountRecovery")}
            </Button>
          </View>
        </>
      )}

      {onPressSignUp && (
        <>
          <Divider />
          <View style={styles.flexRow}>
            <Text>{t("components.loginFooter.signUpMessage")}</Text>
            <Button mode="Text" uppercase={false} onPress={onPressSignUp}>
              {t("screens.welcome.signUp")}
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
