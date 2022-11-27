import { Button, Dialog, Portal, Text } from "react-native-paper";

function ErrorDialog({ isVisible, onDismiss, title = "Error", content }) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
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
