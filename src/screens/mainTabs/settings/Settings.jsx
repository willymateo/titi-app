import { LogoutButton } from "../../../components/LogoutButton";
import { Language, Palette } from "iconoir-react-native";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Preferences</List.Subheader>
        <List.Item
          title="Theme"
          onPress={() => navigation.navigate("ThemeSettings")}
          left={() => <List.Icon icon={props => <Palette {...props} {...styles.iconoir} />} />}
        />
        <List.Item
          title="Language"
          onPress={() => navigation.navigate("LanguageSettings")}
          left={() => <List.Icon icon={props => <Language {...props} {...styles.iconoir} />} />}
        />
        <LogoutButton />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Settings };
