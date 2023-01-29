import { AdventureCard } from "./AdventureCard";
import { Button } from "react-native-paper";

function Home({ navigation }) {
  return (
    <>
      <Button onPress={() => navigation.navigate("AdventureForm")}>Click me</Button>
      <AdventureCard />
    </>
  );
}

export { Home };
