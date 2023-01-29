import { Language as LanguageRadioButton } from "../mainTabs/settings/Language";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { Language, NavArrowDown } from "iconoir-react-native";
import LightLogo from "../../../assets/images/lightLogo.svg";
import { ScrollView, StyleSheet, View } from "react-native";
import DarkLogo from "../../../assets/images/darkLogo.svg";
import { useVisible } from "../../hooks/useVisible";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Footer } from "./Footer";

function Welcome({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.welcome" });
  const { isDark } = useSelector(state => state.colorMode);
  const {
    isVisible: isLanguageDialogVisible,
    hide: hideLanguageDialog,
    show: showLanguageDialog,
  } = useVisible();

  return (
    <View style={[sharedStyles.flx, sharedStyles.flxJCCenter]}>
      <View>
        <Button
          icon={props => <NavArrowDown {...props} {...sharedStyles.iconoirM} />}
          onPress={showLanguageDialog}
          uppercase={false}>
          {t("language")}
        </Button>
        <Portal>
          <Dialog visible={isLanguageDialogVisible} onDismiss={hideLanguageDialog}>
            <Dialog.Icon icon={props => <Language {...props} {...sharedStyles.iconoirM} />} />
            <Dialog.Title>{t("language")}</Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView>
                <LanguageRadioButton />
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>

      <View style={styles.middleContainer}>
        <View style={[sharedStyles.flx, sharedStyles.flxJCEnd, sharedStyles.flxACenter]}>
          <Text style={styles.welcomeText}>{t("welcomeTo")}</Text>
        </View>
        <View style={[sharedStyles.flx, sharedStyles.flxACenter, sharedStyles.flxJCCenter]}>
          {isDark ? (
            <DarkLogo width={styles.logo.width} height={styles.logo.height} />
          ) : (
            <LightLogo width={styles.logo.width} height={styles.logo.height} />
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => navigation.navigate("Login")}
            style={sharedStyles.mv5}
            uppercase={false}
            mode="contained">
            {t("login")}
          </Button>
          <Button
            onPress={() => navigation.navigate("SignUp")}
            style={sharedStyles.mv5}
            uppercase={false}
            mode="contained">
            {t("signUp")}
          </Button>
        </View>
      </View>

      <Footer
        onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        style={[sharedStyles.flx, sharedStyles.flxJCEnd]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  middleContainer: {
    flex: 6,
    justifyContent: "center",
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
});

export { Welcome };
