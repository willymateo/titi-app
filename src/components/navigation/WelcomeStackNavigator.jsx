import { ResetPassword } from "../../screens/welcome/accountRecovery/ResetPassword";
import { RecoveryCode } from "../../screens/welcome/accountRecovery/RecoveryCode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountRecovery } from "../../screens/welcome/accountRecovery";
import { SignUpPhone } from "../../screens/welcome/signUp/SignUpPhone";
import { SignUp } from "../../screens/welcome/signUp";
import { Login } from "../../screens/welcome/Login";
import { sharedStyles } from "../../shared/styles";
import { NavigationBar } from "./NavigationBar";
import { Welcome } from "../../screens/welcome";
import { useTranslation } from "react-i18next";

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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Welcome}
        name="Welcome"
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Login}
        name="Login"
      />

      <Stack.Group>
        <Stack.Screen
          options={{
            title: t("signUp"),
          }}
          component={SignUp}
          name="SignUp"
        />
        <Stack.Screen
          options={{
            title: t("signUpPhone"),
          }}
          component={SignUpPhone}
          name="SignUpPhone"
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          options={{
            title: t("accountRecovery"),
          }}
          component={AccountRecovery}
          name="AccountRecovery"
        />
        <Stack.Screen
          options={{
            title: t("recoveryCode"),
          }}
          component={RecoveryCode}
          name="RecoveryCode"
        />
        <Stack.Screen
          options={{
            title: t("resetPassword"),
          }}
          component={ResetPassword}
          name="ResetPassword"
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { WelcomeStackNavigator };
