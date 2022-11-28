import { Text, ActivityIndicator } from "react-native-paper";
import { useAdventures } from "../services/app/adventures";
import { ScrollView, StyleSheet } from "react-native";
import { AdventureCard } from "./AdventureCard";
import { ErrorScreen } from "./ErrorScreen";

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
        <AdventureCard key={adventure.id} {...adventure} style={styles.card} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },
});

export { ScrollAdventuresCards };
