import { NavigationBar } from "../../../components/navigation/NavigationBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { sharedStyles } from "../../../shared/styles";
import { AdventureForm } from "./AdventureForm";
import { useTranslation } from "react-i18next";
import { Home } from ".";

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  const { t } = useTranslation("translation", { keyPrefix: "components.homeStackNavigator" });

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationBar {...props} />,
        headerShown: true,
      }}
      initialRouteName="HomeRoot">
      <Stack.Screen name="HomeRoot" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        options={{ title: t("createAdventure"), contentStyle: sharedStyles.ph20 }}
        component={AdventureForm}
        name="AdventureForm"
      />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator };
