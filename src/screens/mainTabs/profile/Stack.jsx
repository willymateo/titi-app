import { NavigationBar } from "../../../components/navigation/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { EditProfile } from "./EditProfile";
import { Profile } from ".";

const Stack = createNativeStackNavigator();

function ProfileStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.profileStackNavigator" });

  return (
    <Stack.Navigator
      initialRouteName="ProfileRoot"
      screenOptions={{
        headerShown: true,
        header: props => <NavigationBar {...props} />,
      }}>
      <Stack.Screen
        name="ProfileRoot"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: t("editProfile"),
        }}
      />
    </Stack.Navigator>
  );
}

export { ProfileStackNavigator };
