import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeSimple, UserCircleAlt } from "iconoir-react-native";
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
