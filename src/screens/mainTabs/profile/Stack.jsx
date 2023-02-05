import { NavigationBar } from "../../../components/navigation/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdventureForm } from "../../../components/AdventureForm";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { Edit } from "./Edit";
import { Profile } from ".";

const Stack = createNativeStackNavigator();

function ProfileStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components" });

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationBar {...props} />,
        headerShown: true,
      }}
      initialRouteName="ProfileRoot">
      <Stack.Screen name="ProfileRoot" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen
        options={{ title: t("profileStackNavigator.editProfile"), contentStyle: sharedStyles.ph20 }}
        component={Edit}
        name="EditProfile"
      />
      <Stack.Screen
        options={{
          title: t("adventures.createAdventure"),
          contentStyle: sharedStyles.ph20,
        }}
        component={AdventureForm}
        name="AdventureForm"
      />
    </Stack.Navigator>
  );
}

export { ProfileStackNavigator };
