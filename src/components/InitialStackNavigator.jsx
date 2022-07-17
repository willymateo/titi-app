import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountRecovery } from "../screens/AccountRecovery";
import { SignUp } from "../screens/SignUp";
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountRecovery"
        component={AccountRecovery}
        options={{
          headerShown: true,
          title: "Account Recovery",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export { InitialStackNavigator };
