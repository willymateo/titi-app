import { Text, ActivityIndicator } from "react-native-paper";
import { useAdventures } from "../services/app/adventures";
import { AdventureMiniCard } from "./AdventureMiniCard";
import { sharedStyles } from "../shared/styles";
import { ErrorScreen } from "./ErrorScreen";
import { ScrollView } from "react-native";

function AdventureScrollCards() {
  const { data: adventures, error, isValidating } = useAdventures();

  if (isValidating) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!adventures.length) {
    return <ErrorScreen>Adventures not found</ErrorScreen>;
  }

  return (
    <ScrollView>
      {adventures.map(adventure => (
        <AdventureMiniCard key={adventure.id} {...adventure} style={sharedStyles.mv5} />
      ))}
    </ScrollView>
  );
}

export { AdventureScrollCards };
