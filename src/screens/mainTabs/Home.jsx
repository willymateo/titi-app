import { ScrollAdventuresCards } from "../../components/ScrollAdventuresCards";
import { sharedStyles } from "../../theme/styles";
import { View } from "react-native";

function Home() {
  return (
    <View style={sharedStyles.flxCenter}>
      <ScrollAdventuresCards />
    </View>
  );
}

export { Home };
