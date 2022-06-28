import { Text, Switch } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useState } from "react";

function Main() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  return (
    <View style={styles.container}>
      {fontsLoaded ? (
        <Text style={{ fontFamily: "Pacifico_400Regular" }}>Dark mode</Text>
      ) : (
        <Text>Hola</Text>
      )}
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch}></Switch>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Main };
