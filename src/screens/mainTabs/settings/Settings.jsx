import { LogoutButton } from "../../../components/LogoutButton";
import { Language, Palette } from "iconoir-react-native";
import { About } from "../../../components/About";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

function Settings({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>{t("preferences")}</List.Subheader>
        <List.Item
          title={t("theme")}
          onPress={() => navigation.navigate("ThemeSettings")}
          left={() => <List.Icon icon={props => <Palette {...props} {...styles.iconoir} />} />}
        />
        <List.Item
          title={t("language")}
          onPress={() => navigation.navigate("LanguageSettings")}
          left={() => <List.Icon icon={props => <Language {...props} {...styles.iconoir} />} />}
        />
        <About style={styles.about} />
        <LogoutButton />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
  about: {
    marginBottom: 15,
  },
});

export { Settings };
