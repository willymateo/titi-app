import { Language, NavArrowRight, Palette } from "iconoir-react-native";
import { LogoutButton } from "../../../components/LogoutButton";
import { AboutCard } from "../../../components/AboutCard";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

function Settings({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });

  return (
    <View>
      <List.Section>
        <List.Subheader>{t("preferences")}</List.Subheader>
        <List.Item
          title={t("theme")}
          onPress={() => navigation.navigate("ThemeSettings")}
          left={() => <List.Icon icon={props => <Palette {...props} {...styles.iconoir} />} />}
          right={() => (
            <List.Icon icon={props => <NavArrowRight {...props} {...styles.iconoir} />} />
          )}
        />
        <List.Item
          title={t("language")}
          onPress={() => navigation.navigate("LanguageSettings")}
          left={() => <List.Icon icon={props => <Language {...props} {...styles.iconoir} />} />}
          right={() => (
            <List.Icon icon={props => <NavArrowRight {...props} {...styles.iconoir} />} />
          )}
        />
        <AboutCard style={styles.about} />
        <LogoutButton />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  iconoir: {
    height: 25,
    width: 25,
  },
  about: {
    marginBottom: 15,
  },
});

export { Settings };
