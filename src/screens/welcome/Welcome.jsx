import { LanguageSettings } from "../mainTabs/settings/LanguageSettings";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import LightLogo from "../../../assets/images/lightLogo.svg";
import { ScrollView, StyleSheet, View } from "react-native";
import { LoginFooter } from "../../components/LoginFooter";
import DarkLogo from "../../../assets/images/darkLogo.svg";
import { NavArrowDown } from "iconoir-react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useState } from "react";

function Welcome({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.welcome" });
  const { isDark } = useSelector(state => state.colorMode);
  const [isVisibleLS, setIsVisibleLS] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Button
          uppercase={false}
          onPress={() => setIsVisibleLS(true)}
          icon={props => <NavArrowDown {...props} {...styles.iconoir} />}>
          {t("language")}
        </Button>
        <Portal>
          <Dialog visible={isVisibleLS} onDismiss={() => setIsVisibleLS(false)}>
            {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
            <Dialog.Title style={styles.dialogTitle}>{t("language")}</Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView>
                <LanguageSettings />
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>{t("welcomeTo")}</Text>
        </View>
        <View style={styles.logoContainer}>
          {isDark ? (
            <DarkLogo width={styles.logo.width} height={styles.logo.height} />
          ) : (
            <LightLogo width={styles.logo.width} height={styles.logo.height} />
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.buttons}
            onPress={() => navigation.navigate("Login")}>
            {t("login")}
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.buttons}
            onPress={() => navigation.navigate("SignUp")}>
            {t("signUp")}
          </Button>
        </View>
      </View>

      <LoginFooter
        style={styles.bottomContainer}
        onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  middleContainer: {
    flex: 6,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  welcomeTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
  },
  logo: {
    height: "100%",
    width: "55%",
  },
  buttons: {
    marginVertical: 5,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Welcome };
