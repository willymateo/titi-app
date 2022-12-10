import { Language, NavArrowRight, Palette, PasswordCursor } from "iconoir-react-native";
import { LogoutButton } from "../../../components/LogoutButton";
import { AboutCard } from "../../../components/AboutCard";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { List } from "react-native-paper";
import { View } from "react-native";

function Settings({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "screens.settings" });

  return (
    <>
      <List.Section>
        <List.Subheader>{t("preferences")}</List.Subheader>
        <List.Item
          title={t("theme")}
          onPress={() => navigation.navigate("ThemeSettings")}
          left={props => (
            <List.Icon
              {...props}
              icon={props => <Palette {...props} {...sharedStyles.iconoirM} />}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />}
            />
          )}
        />
        <List.Item
          title={t("language")}
          onPress={() => navigation.navigate("LanguageSettings")}
          left={props => (
            <List.Icon
              {...props}
              icon={props => <Language {...props} {...sharedStyles.iconoirM} />}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />}
            />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>{t("security")}</List.Subheader>
        <List.Item
          title={t("changePassword")}
          onPress={() => navigation.navigate("ChangePassword")}
          left={props => (
            <List.Icon
              {...props}
              icon={props => <PasswordCursor {...props} {...sharedStyles.iconoirM} />}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon={props => <NavArrowRight {...props} {...sharedStyles.iconoirM} />}
            />
          )}
        />
      </List.Section>
      <View style={sharedStyles.mh20}>
        <AboutCard style={sharedStyles.mb15} />
        <LogoutButton />
      </View>
    </>
  );
}

export { Settings };
