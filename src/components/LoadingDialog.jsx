import { ActivityIndicator, Dialog, Portal, Text } from "react-native-paper";
import { CloudSync } from "iconoir-react-native";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";

function LoadingDialog({ isVisible, title, content }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.loadingDialog" });

  return (
    <Portal>
      <Dialog visible={isVisible}>
        <Dialog.Icon icon={props => <CloudSync {...props} {...sharedStyles.iconoirL} />} />
        <Dialog.Title>{title || t("title")}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
          <ActivityIndicator />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export { LoadingDialog };
