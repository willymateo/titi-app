import { AdventureMiniCard } from "../../../components/AdventureMiniCard";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { ErrorScreen } from "../../../components/ErrorScreen";
import { useUserAdventures } from "../../../services/app/me";
import { sharedStyles } from "../../../shared/styles";
import { FavouriteBook } from "iconoir-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

function UserAdventures() {
  const { t } = useTranslation("translation", { keyPrefix: "components.adventures" });
  const { data: adventures, error, isValidating } = useUserAdventures();
  const { username, idGender, photoUrl } = useSelector(({ userSession }) => userSession);
  const { colors } = useTheme();

  if (isValidating) {
    return <ActivityIndicator size="large" style={sharedStyles.flx} />;
  }

  if (error) {
    return <ErrorScreen style={sharedStyles.flx}>{error}</ErrorScreen>;
  }

  if (!adventures.length) {
    return (
      <ErrorScreen
        icon={() => <FavouriteBook {...sharedStyles.iconoirL} color={colors.error} />}
        style={sharedStyles.flx}>
        {t("noAdventures")}
      </ErrorScreen>
    );
  }

  return (
    <ScrollView>
      {adventures.map(adventure => (
        <AdventureMiniCard
          key={adventure.id}
          {...adventure}
          style={sharedStyles.mv5}
          publisher={{ username, gender: idGender, photoUrl }}
        />
      ))}
    </ScrollView>
  );
}

export { UserAdventures };
