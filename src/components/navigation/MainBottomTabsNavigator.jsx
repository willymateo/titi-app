import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Bell, HomeSimple, IosSettings, UserCircleAlt } from "iconoir-react-native";
import { Notifications } from "../../screens/mainTabs/Notifications";
import { SettingsStackNavigator } from "./SettingsStackNavigator";
import { Profile } from "../../screens/mainTabs/profile";
import { Home } from "../../screens/mainTabs/Home";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";

const Tab = createMaterialBottomTabNavigator();

function MainBottomTabsNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.mainBottomTabsNavigator" });

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: props => <HomeSimple {...props} {...sharedStyles.iconoirM} />,
          tabBarLabel: t("home"),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: props => <Bell {...props} {...sharedStyles.iconoirM} />,
          tabBarLabel: t("notifications"),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => <UserCircleAlt {...props} {...sharedStyles.iconoirM} />,
          tabBarLabel: t("profile"),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: props => <IosSettings {...props} {...sharedStyles.iconoirM} />,
          tabBarLabel: t("settings"),
        }}
      />
    </Tab.Navigator>
  );
}

export { MainBottomTabsNavigator };
