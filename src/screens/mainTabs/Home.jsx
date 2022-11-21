import { ScrollAdventuresCards } from "../../components/ScrollAdventuresCards";
import { StyleSheet, View } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <ScrollAdventuresCards />
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

export { Home };
