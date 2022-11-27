import { useAccountInformation } from "../../../services/app/me";
import { ActivityIndicator, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { ProfileTop } from "./ProfileTop";

function Profile() {
  const { data, error, isValidating } = useAccountInformation();

  if (isValidating) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  console.log("DATA", JSON.stringify(data, null, 2));

  return (
    <View style={styles.container}>
      <ProfileTop {...data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export { Profile };
