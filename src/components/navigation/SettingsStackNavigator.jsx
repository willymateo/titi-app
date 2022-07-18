import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeSettings } from "../settings/ThemeSettings";
import { Settings } from "../../screens/Settings";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SettingsRoot"
      screenOptions={{
        contentStyle: {
          paddingHorizontal: 20,
        },
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
    </Stack.Navigator>
  );
}

export { SettingsStackNavigator };
