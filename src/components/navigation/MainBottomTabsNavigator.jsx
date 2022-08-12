import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Bell, HomeSimple, IosSettings, UserCircleAlt } from "iconoir-react-native";
import { Notifications } from "../../screens/mainTabs/Notifications";
import { SettingsStackNavigator } from "./SettingsStackNavigator";
import { Profile } from "../../screens/mainTabs/Profile";
import { Home } from "../../screens/mainTabs/Home";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const Tab = createMaterialBottomTabNavigator();

function MainBottomTabsNavigator() {
  const { t } = useTranslation();

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
          tabBarLabel: t("components.mainBottomTabsNavigator.home"),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: props => <Bell {...props} {...styles.iconoir} />,
          tabBarLabel: t("components.mainBottomTabsNavigator.notifications"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => <UserCircleAlt {...props} {...styles.iconoir} />,
          tabBarLabel: t("components.mainBottomTabsNavigator.profile"),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: props => <IosSettings {...props} {...styles.iconoir} />,
          tabBarLabel: t("components.mainBottomTabsNavigator.settings"),
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

export { MainBottomTabsNavigator };
