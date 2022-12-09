import { FocusAwareStatusBar } from "../FocusAwareStatusBar";
import { Appbar } from "react-native-paper";

function NavigationBar({ options: { title }, navigation }) {
  return (
    <>
      <FocusAwareStatusBar translucent />
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  );
}

export { NavigationBar };
