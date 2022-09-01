import { ProfileTop } from "../../components/ProfileTop";
import { StyleSheet, View } from "react-native";

function Profile() {
  return (
    <View style={styles.container}>
      <ProfileTop />
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

export { Profile };
