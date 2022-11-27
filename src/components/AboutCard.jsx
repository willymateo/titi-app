import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

function AboutCard({ style }) {
  return (
    <Card style={style}>
      <Card.Content style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.appTitle}>{Constants.manifest.APP_NAME}</Text>
          <Text>v{Constants.manifest.version}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.owner}>ÐarkÖs</Text>
          <Text style={styles.separator}>●</Text>
          <Text>Willy Mateo E.</Text>
        </View>
      </Card.Content>
    </Card>
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
    fontSize: 30,
    paddingRight: 5,
    fontFamily: "RedHatMono",
  },
  owner: {
    fontSize: 20,
    fontFamily: "Eczar400Regular",
  },
  separator: {
    marginHorizontal: 8,
  },
});

export { AboutCard };
