import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Bell, HomeSimple, IosSettings, UserCircle } from "iconoir-react-native";
import { SettingsStackNavigator } from "./settings/Stack";
import { ProfileStackNavigator } from "./profile/Stack";
import { sharedStyles } from "../../shared/styles";
import { HomeStackNavigator } from "./home/Stack";
import { Notifications } from "./Notifications";
import { useTranslation } from "react-i18next";

const Tab = createMaterialBottomTabNavigator();

function MainBottomTabsNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.mainBottomTabsNavigator" });

  return (
    <Tab.Navigator initialRouteName="HomeTab" shifting>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
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
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: props => <UserCircle {...props} {...sharedStyles.iconoirM} />,
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
