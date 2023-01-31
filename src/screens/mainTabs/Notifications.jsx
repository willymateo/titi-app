import { sharedStyles } from "../../shared/styles";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import { View } from "react-native";

function Notifications() {
  const { t } = useTranslation("translation", { keyPrefix: "screens.notifications" });

  return (
    <View style={sharedStyles.fullSizeCenter}>
      <Text>{t("noNotifications")}</Text>
    </View>
  );
}

export { Notifications };
