import { NavigationBar } from "../../../components/navigation/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { sharedStyles } from "../../../shared/styles";
import { ChangePassword } from "./ChangePassword";
import { useTranslation } from "react-i18next";
import { Language } from "./Language";
import { Theme } from "./Theme";
import { Settings } from ".";

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
