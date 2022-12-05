import { LanguageSettings } from "../../screens/mainTabs/settings/LanguageSettings";
import { ChangePassword } from "../../screens/mainTabs/settings/ChangePassword";
import { ThemeSettings } from "../../screens/mainTabs/settings/ThemeSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FocusAwareStatusBar } from "../FocusAwareStatusBar";
import { Settings } from "../../screens/mainTabs/settings";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation("translation", {});

  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        headerShown: true,
        header: ({ options: { title }, navigation }) => (
          <>
            <FocusAwareStatusBar translucent />
            <Appbar.Header>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title={title} />
            </Appbar.Header>
          </>
        ),
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
