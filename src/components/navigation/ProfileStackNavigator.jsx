import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditProfile } from "../../screens/mainTabs/profile/EditProfile";
import { FocusAwareStatusBar } from "../FocusAwareStatusBar";
import { Profile } from "../../screens/mainTabs/profile";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function ProfileStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.profileStackNavigator" });

  return (
    <Stack.Navigator
      initialRouteName="ProfileRoot"
      screenOptions={{
        headerShown: true,
        header: ({ options: { title }, navigation }) => (
          <>
            <FocusAwareStatusBar translucent />
            <Appbar.Header>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title={title} />
            </Appbar.Header>
          </>
        ),
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
