import { ChangePassword } from "../../screens/mainTabs/settings/ChangePassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Language } from "../../screens/mainTabs/settings/Language";
import { Theme } from "../../screens/mainTabs/settings/Theme";
import { Settings } from "../../screens/mainTabs/settings";
import { sharedStyles } from "../../shared/styles";
import { NavigationBar } from "./NavigationBar";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation("translation", {});

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: props => <NavigationBar {...props} />,
      }}
      initialRouteName="SettingsRoot">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Settings}
        name="SettingsRoot"
      />
      <Stack.Screen
        options={{
          title: t("components.settingsStackNavigator.themeSettings"),
        }}
        name="ThemeSettings"
        component={Theme}
      />
      <Stack.Screen
        options={{
          title: t("components.settingsStackNavigator.languageSettings"),
        }}
        name="LanguageSettings"
        component={Language}
      />
      <Stack.Screen
        options={{
          title: t("screens.settings.changePassword"),
          contentStyle: sharedStyles.ph20,
        }}
        component={ChangePassword}
        name="ChangePassword"
      />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
