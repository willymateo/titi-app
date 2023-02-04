import { FocusAwareStatusBar } from "./FocusAwareStatusBar";
import { Appbar } from "react-native-paper";

function NavigationBar({ options: { title }, navigation }) {
  return (
    <>
      <FocusAwareStatusBar translucent />
      <Appbar.Header elevated mode="center-aligned">
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  );
}

export { NavigationBar };
