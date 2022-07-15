import { BellNotification, HomeSimple, IosSettings, UserCircleAlt } from "iconoir-react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Notifications } from "../screens/Notifications";
import { Settings } from "../screens/Settings";
import { Profile } from "../screens/Profile";
import { StyleSheet } from "react-native";
import { Home } from "../screens/Home";

const Tab = createMaterialBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
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
          tabBarIcon: props => <BellNotification {...props} {...styles.iconoir} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: props => <IosSettings {...props} {...styles.iconoir} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => <UserCircleAlt {...props} {...styles.iconoir} />,
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
