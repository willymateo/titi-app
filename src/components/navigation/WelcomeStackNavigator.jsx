import { AccountRecovery } from "../../screens/welcome/accountRecovery/AccountRecovery";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Welcome } from "../../screens/welcome/Welcome";
import { SignUp } from "../../screens/welcome/SignUp";
import { Login } from "../../screens/welcome/Login";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function WelcomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        contentStyle: {
          paddingHorizontal: 20,
        },
        header: ({ options: { title } }) => (
          <Appbar.Header>
            <Appbar.Content title={title} style={styles.appBarContent} />
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AccountRecovery"
        component={AccountRecovery}
        options={{
          headerShown: true,
          title: "Account Recovery",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  appBarContent: {
    alignItems: "center",
  },
});

export { WelcomeStackNavigator };
