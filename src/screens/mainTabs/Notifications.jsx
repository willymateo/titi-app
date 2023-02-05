import { ErrorScreen } from "../../components/ErrorScreen";
import { ChatBubbleCheck } from "iconoir-react-native";
import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { View } from "react-native";

function Notifications() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.notifications" });
  const { colors } = useTheme();

  return (
    <View style={sharedStyles.flx}>
      <ErrorScreen
        style={sharedStyles.flx}
        icon={() => <ChatBubbleCheck {...sharedStyles.iconoirL} color={colors.primary} />}>
        {t("noNotifications")}
      </ErrorScreen>
    </View>
  );
}

export { Notifications };
