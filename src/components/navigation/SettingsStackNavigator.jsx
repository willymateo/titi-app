import { LanguageSettings } from "../../screens/mainTabs/settings/LanguageSettings";
import { ThemeSettings } from "../../screens/mainTabs/settings/ThemeSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FocusAwareStatusBar } from "../FocusAwareStatusBar";
import { Settings } from "../../screens/mainTabs/settings";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.settingsStackNavigator" });

  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        headerShown: true,
        contentStyle: sharedStyles.ph20,
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
          title: t("themeSettings"),
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettings}
        options={{
          title: t("languageSettings"),
        }}
      />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
