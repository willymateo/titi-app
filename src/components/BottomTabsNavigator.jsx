import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeSimple, UserCircleAlt } from "iconoir-react-native";
import { Profile } from "../screens/Profile";
import { Home } from "../screens/Home";

const Tab = createMaterialBottomTabNavigator();
const iconoirStyle = {
  height: 25,
  width: 25,
};

function BottomTabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: props => <HomeSimple {...props} {...iconoirStyle} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => <UserCircleAlt {...props} {...iconoirStyle} />,
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomTabsNavigator };
