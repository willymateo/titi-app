import { ChangePassword } from "../../screens/mainTabs/settings/ChangePassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Language } from "../../screens/mainTabs/settings/Language";
import { Theme } from "../../screens/mainTabs/settings/Theme";
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
        component={Theme}
        options={{
          title: t("components.settingsStackNavigator.themeSettings"),
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={Language}
        options={{
          title: t("components.settingsStackNavigator.languageSettings"),
        }}
      />
      <Stack.Screen
        name="SecuritySettings"
        component={ChangePassword}
        options={{
          title: t("screens.settings.changePassword"),
        }}
      />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
