import { Button, Dialog, Portal, Text } from "react-native-paper";
import { WarningCircle } from "iconoir-react-native";
import { sharedStyles } from "../shared/styles";
import { useTranslation } from "react-i18next";

function ErrorDialog({
  icon: Icon = WarningCircle,
  onDismiss = () => {},
  title = "Error",
  isVisible,
  content,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "components.dialog" });

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Icon icon={props => <Icon {...props} {...sharedStyles.iconoirL} />} />
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{t("ok")}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export { ErrorDialog };
