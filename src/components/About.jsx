import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { Eczar_400Regular as Eczar400Regular } from "@expo-google-fonts/eczar";
import { ActivityIndicator, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

function About() {
  const [fontsLoaded] = useFonts({
    Pacifico400Regular,
    Eczar400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.appTitle}>CatHot</Text>
        <Text>v{Constants.manifest.version}</Text>
      </View>
      <Text>from</Text>
      <Text style={styles.owner}>DarkOs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 20,
    paddingRight: 5,
    textAlign: "center",
    fontFamily: "Pacifico400Regular",
  },
  owner: {
    fontSize: 20,
    fontFamily: "Eczar400Regular",
  },
});

export { About };
