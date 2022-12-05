import { Language, NavArrowRight, Palette, PasswordCursor } from "iconoir-react-native";
import { LogoutButton } from "../../../components/LogoutButton";
import { AboutCard } from "../../../components/AboutCard";
import { sharedStyles } from "../../../shared/styles";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";

function Settings({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });

  return (
    <>
      <List.Section>
        <List.Subheader>{t("preferences")}</List.Subheader>
        <List.Item
          title={t("theme")}
          onPress={() => navigation.navigate("ThemeSettings")}
          left={() => (
            <List.Icon icon={props => <Palette {...props} {...sharedStyles.iconoirM} />} />
          )}
          right={() => (
            <List.Icon icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />} />
          )}
        />
        <List.Item
          title={t("language")}
          onPress={() => navigation.navigate("LanguageSettings")}
          left={() => (
            <List.Icon icon={props => <Language {...props} {...sharedStyles.iconoirM} />} />
          )}
          right={() => (
            <List.Icon icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>{t("security")}</List.Subheader>
        <List.Item
          title={t("changePassword")}
          onPress={() => navigation.navigate("ThemeSettings")}
          left={() => (
            <List.Icon icon={props => <PasswordCursor {...props} {...sharedStyles.iconoirM} />} />
          )}
          right={() => (
            <List.Icon icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />} />
          )}
        />
      </List.Section>
      <View style={sharedStyles.mh20}>
        <AboutCard style={styles.about} />
        <LogoutButton />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  about: {
    marginBottom: 15,
  },
});

export { Settings };
