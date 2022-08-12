import { AccountRecovery } from "../../screens/welcome/accountRecovery/AccountRecovery";
import { ResetPassword } from "../../screens/welcome/accountRecovery/ResetPassword";
import { RecoveryCode } from "../../screens/welcome/accountRecovery/RecoveryCode";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUpPhone } from "../../screens/welcome/signUp/SignUpPhone";
import { SignUp } from "../../screens/welcome/signUp/SignUp";
import { Welcome } from "../../screens/welcome/Welcome";
import { Login } from "../../screens/welcome/Login";
import { useTranslation } from "react-i18next";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function WelcomeStackNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: true,
        contentStyle: {
          paddingHorizontal: 20,
        },
        header: ({ options: { title }, navigation }) => (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={title} />
          </Appbar.Header>
        ),
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
            title: t("components.welcomeStackNavigator.signUp"),
          }}
        />
        <Stack.Screen
          name="SignUpPhone"
          component={SignUpPhone}
          options={{
            title: t("components.welcomeStackNavigator.signUpPhone"),
          }}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="AccountRecovery"
          component={AccountRecovery}
          options={{
            title: t("components.welcomeStackNavigator.accountRecovery"),
          }}
        />
        <Stack.Screen
          name="RecoveryCode"
          component={RecoveryCode}
          options={{
            title: t("components.welcomeStackNavigator.recoveryCode"),
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            title: t("components.welcomeStackNavigator.resetPassword"),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  appBarContent: {
    alignItems: "center",
  },
});

export { WelcomeStackNavigator };
