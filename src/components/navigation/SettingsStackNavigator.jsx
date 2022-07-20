import { LanguageSettings } from "../../screens/mainTabs/settings/LanguageSettings";
import { ThemeSettings } from "../../screens/mainTabs/settings/ThemeSettings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../../screens/mainTabs/settings/Settings";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        header: ({ options: { title }, navigation }) => (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={title} />
          </Appbar.Header>
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
          headerShown: true,
          title: "Theme Settings",
        }}
      />
      <Stack.Screen
        name="LanguageSettings"
        component={LanguageSettings}
        options={{
          headerShown: true,
          title: "Language Settings",
        }}
      />
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
