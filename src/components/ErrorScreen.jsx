import { sharedStyles } from "../theme/styles";
import { Text } from "react-native-paper";
import { View } from "react-native";

function ErrorScreen({ children }) {
  return (
    <View style={sharedStyles.flxCenter}>
      <Text>Imagen placeholder</Text>
      <Text>{children}</Text>
    </View>
  );
}

export { ErrorScreen };
