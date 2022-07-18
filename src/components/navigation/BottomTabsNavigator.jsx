import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Bell, HomeSimple, IosSettings, UserCircleAlt } from "iconoir-react-native";
import { SettingsStackNavigator } from "./SettingsStackNavigator";
import { Notifications } from "../../screens/Notifications";
import { Profile } from "../../screens/Profile";
import { StyleSheet } from "react-native";
import { Home } from "../../screens/Home";

const Tab = createMaterialBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        contentStyle: {
          paddingHorizontal: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: props => <HomeSimple {...props} {...styles.iconoir} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: props => <Bell {...props} {...styles.iconoir} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => <UserCircleAlt {...props} {...styles.iconoir} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: props => <IosSettings {...props} {...styles.iconoir} />,
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { BottomTabsNavigator };
