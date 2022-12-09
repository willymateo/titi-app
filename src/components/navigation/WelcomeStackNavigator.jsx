import { AccountRecovery } from "../../screens/welcome/accountRecovery/AccountRecovery";
import { ResetPassword } from "../../screens/welcome/accountRecovery/ResetPassword";
import { RecoveryCode } from "../../screens/welcome/accountRecovery/RecoveryCode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUpPhone } from "../../screens/welcome/signUp/SignUpPhone";
import { SignUp } from "../../screens/welcome/signUp/SignUp";
import { Welcome } from "../../screens/welcome/Welcome";
import { Login } from "../../screens/welcome/Login";
import { sharedStyles } from "../../shared/styles";
import { NavigationBar } from "./NavigationBar";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

function WelcomeStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.welcomeStackNavigator" });

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        contentStyle: sharedStyles.ph20,
        header: props => <NavigationBar {...props} />,
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Group>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: t("signUp"),
          }}
        />
        <Stack.Screen
          name="SignUpPhone"
          component={SignUpPhone}
          options={{
            title: t("signUpPhone"),
          }}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="AccountRecovery"
          component={AccountRecovery}
          options={{
            title: t("accountRecovery"),
          }}
        />
        <Stack.Screen
          name="RecoveryCode"
          component={RecoveryCode}
          options={{
            title: t("recoveryCode"),
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: t("resetPassword"),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { WelcomeStackNavigator };
