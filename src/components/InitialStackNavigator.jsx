import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountRecovery } from "../screens/AccountRecovery";
import { Appbar } from "react-native-paper";
import { SignUp } from "../screens/SignUp";
import { StyleSheet } from "react-native";
import { Login } from "../screens/Login";

const Stack = createNativeStackNavigator();

function InitialStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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

export { InitialStackNavigator };
