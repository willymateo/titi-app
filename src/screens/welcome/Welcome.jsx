import { LoginFooter } from "../../components/LoginFooter";
import LightLogo from "../../../assets/lightLogo.svg";
import DarkLogo from "../../../assets/darkLogo.svg";
import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Welcome({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.welcome" });
  const { isDark } = useSelector(state => state.colorMode);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>{t("welcomeTo")}</Text>
      </View>
      <View style={styles.logoContainer}>
        {isDark ? <DarkLogo width={styles.logo.width} /> : <LightLogo width={styles.logo.width} />}
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
      <LoginFooter
        style={styles.loginFooter}
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
  welcomeTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 30,
  },
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  logo: {
    width: "70%",
  },
  buttons: {
    marginVertical: 5,
  },
  loginFooter: {
    flex: 1,
    justifyContent: "center",
  },
});

export { Welcome };
