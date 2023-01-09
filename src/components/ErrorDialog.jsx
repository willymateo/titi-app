import { Button, Dialog, Portal, Text } from "react-native-paper";
import { WarningCircledOutline } from "iconoir-react-native";
import { sharedStyles } from "../shared/styles";

function ErrorDialog({
  icon: Icon = WarningCircledOutline,
  onDismiss = () => {},
  title = "Error",
  isVisible,
  content,
}) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Icon icon={props => <Icon {...props} {...sharedStyles.iconoirL} />} />
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export { ErrorDialog };
