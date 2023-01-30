import { AdventureCard } from "./AdventureCard";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

function Home({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.homeStackNavigator" });
  return (
    <>
      <Button onPress={() => navigation.navigate("AdventureForm")}>{t("createAdventure")}</Button>
      <AdventureCard />
    </>
  );
}

export { Home };
