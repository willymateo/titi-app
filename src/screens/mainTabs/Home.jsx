import { AdventuresCard } from "../../components/AdventuresCard";
import { StyleSheet, View } from "react-native";

function Home() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export { Home };
