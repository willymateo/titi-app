import { NavigationBar } from "../../../components/navigation/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangePassword } from "../../../components/ChangePassword";
import { PersonalInformation } from "./PersonalInformation";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Language } from "./Language";
import { Theme } from "./Theme";
import { Settings } from ".";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation();

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
          title: t("screens.settings.personalInformation"),
          contentStyle: sharedStyles.ph20,
        }}
        name="PersonalInformation"
        component={PersonalInformation}
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
