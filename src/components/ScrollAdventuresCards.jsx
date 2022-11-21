import { useAdventures } from "../services/app/adventures";
import { Text, ActivityIndicator } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import { AdventureCard } from "./AdventureCard";

function ScrollAdventuresCards() {
  const { data: adventures, error, isValidating } = useAdventures();

  if (isValidating) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

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
