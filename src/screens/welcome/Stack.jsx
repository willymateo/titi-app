import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationBar } from "../../components/navigation/NavigationBar";
import { ChangePassword } from "../../components/ChangePassword";
import { RecoveryCode } from "./accountRecovery/RecoveryCode";
import { AccountRecovery } from "./accountRecovery";
import { SignUpPhone } from "./signUp/SignUpPhone";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { Location } from "./signUp/Location";
import { SignUp } from "./signUp";
import { Login } from "./Login";
import { Welcome } from ".";

const Stack = createNativeStackNavigator();

function WelcomeStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.welcomeStackNavigator" });

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: props => <NavigationBar {...props} />,
        contentStyle: sharedStyles.ph20,
        headerShown: true,
      }}>
      <Stack.Screen options={{ headerShown: false }} component={Welcome} name="Welcome" />
      <Stack.Screen options={{ headerShown: false }} component={Login} name="Login" />

      <Stack.Group>
        <Stack.Screen options={{ title: t("location") }} component={Location} name="Location" />
        <Stack.Screen options={{ title: t("signUp") }} component={SignUp} name="SignUp" />
        <Stack.Screen
          options={{ title: t("signUpPhone") }}
          component={SignUpPhone}
          name="SignUpPhone"
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          options={{ title: t("accountRecovery") }}
          component={AccountRecovery}
          name="AccountRecovery"
        />
        <Stack.Screen
          options={{ title: t("recoveryCode") }}
          component={RecoveryCode}
          name="RecoveryCode"
        />
        <Stack.Screen
          initialParams={{ buttonabel: t("resetPassword") }}
          options={{ title: t("resetPassword") }}
          component={ChangePassword}
          name="ResetPassword"
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { WelcomeStackNavigator };
