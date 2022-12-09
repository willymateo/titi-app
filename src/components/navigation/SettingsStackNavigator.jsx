import { LanguageSettings } from "../../screens/mainTabs/settings/LanguageSettings";
import { ChangePassword } from "../../screens/mainTabs/settings/ChangePassword";
import { ThemeSettings } from "../../screens/mainTabs/settings/ThemeSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../../screens/mainTabs/settings";
import { NavigationBar } from "./NavigationBar";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation("translation", {});

  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        headerShown: true,
        header: props => <NavigationBar {...props} />,
      }}>
      <Stack.Screen
        name="SettingsRoot"
        component={Settings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ThemeSettings"
        component={ThemeSettings}
        options={{
          title: t("components.settingsStackNavigator.themeSettings"),
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettings}
        options={{
          title: t("components.settingsStackNavigator.languageSettings"),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: t("screens.settings.changePassword"),
        }}
      />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
