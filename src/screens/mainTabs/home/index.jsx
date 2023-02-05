import { sharedStyles } from "../../../shared/styles";
import { AdventureCard } from "./AdventureCard";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";

function Home({ navigation }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventures" });

  return (
    <>
      <Button
        onPress={() => navigation.navigate("AdventureForm")}
        style={[sharedStyles.mh20, sharedStyles.mt5]}
        mode="contained-tonal">
        {t("createAdventure")}
      </Button>
      <AdventureCard />
    </>
  );
}

export { Home };
