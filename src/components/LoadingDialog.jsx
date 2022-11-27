import { ActivityIndicator, Dialog, Portal, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

function LoadingDialog({ isVisible, title, content }) {
  const { t } = useTranslation("translation", { keyPrefix: "components.loadingDialog" });

  return (
    <Portal>
      <Dialog visible={isVisible}>
        {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
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
