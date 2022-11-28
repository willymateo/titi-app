import { sharedStyles } from "../../shared/styles";
import { Text } from "react-native-paper";
import { View } from "react-native";

function Notifications() {
  return (
    <View style={sharedStyles.fullSizeCenter}>
      <Text>You don't have notifications yet</Text>
    </View>
  );
}

export { Notifications };
