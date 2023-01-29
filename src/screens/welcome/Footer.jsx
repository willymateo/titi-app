import { Button, Divider, Text } from "react-native-paper";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

function Footer({ onPressLogin, onPressSignUp, onPressAccountRecovery, style }) {
  const { t } = useTranslation();

  return (
    <View style={style}>
      {onPressLogin && (
        <View
          style={[
            sharedStyles.flxJCCenter,
            sharedStyles.flxACenter,
            sharedStyles.flxWrap,
            sharedStyles.flxRow,
          ]}>
          <Text>{t("components.loginFooter.loginMessage")}</Text>
          <Button mode="Text" uppercase={false} onPress={onPressLogin}>
            {t("screens.welcome.login")}
          </Button>
        </View>
      )}

      {onPressAccountRecovery && (
        <>
          <Divider />
          <View
            style={[
              sharedStyles.flxJCCenter,
              sharedStyles.flxACenter,
              sharedStyles.flxWrap,
              sharedStyles.flxRow,
            ]}>
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
          <View
            style={[
              sharedStyles.flxJCCenter,
              sharedStyles.flxACenter,
              sharedStyles.flxWrap,
              sharedStyles.flxRow,
            ]}>
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

export { Footer };
