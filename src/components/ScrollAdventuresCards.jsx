import { Text, ActivityIndicator } from "react-native-paper";
import { useAdventures } from "../services/app/adventures";
import { AdventureCard } from "./AdventureCard";
import { sharedStyles } from "../shared/styles";
import { ErrorScreen } from "./ErrorScreen";
import { ScrollView } from "react-native";

function ScrollAdventuresCards() {
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

  console.log("ADVENTURES", adventures);

  return (
    <ScrollView>
      {adventures.map(adventure => (
        <AdventureCard key={adventure.id} {...adventure} style={sharedStyles.mv5} />
      ))}
    </ScrollView>
  );
}

export { ScrollAdventuresCards };
