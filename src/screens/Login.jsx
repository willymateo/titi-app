import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { StyleSheet, View } from "react-native";

function Login() {
  const [fontsLoaded] = useFonts({
    Pacifico400Regular,
  });

  return (
    <View style={{ ...styles.container }}>
      <Text
        style={
          fontsLoaded
            ? { ...styles.appTitle, fontFamily: "Pacifico400Regular" }
            : { ...styles.appTitle }
        }>
        CatHot
      </Text>
      <TextInput label="Username" left={<User {...styles.iconoir} />} />
      <TextInput
        label="Password"
        secureTextEntry
        left={<KeyAltBack {...styles.iconoir} />}
        right={<EyeEmpty {...styles.iconoir} />}
      />
      <Button mode="contained" uppercase={false} onPress={() => console.log("Loging in...")}>
        Log in
      </Button>
      <View style={styles.flexRow}>
        <Text>Forgot your password?</Text>
        <Button mode="text" uppercase={false} onPress={() => console.log("Recovering account...")}>
          Recover account
        </Button>
      </View>
      <Divider />
      <View style={styles.flexRow}>
        <Text>Don't have an account?</Text>
        <Button mode="Text" uppercase={false} onPress={() => console.log("Siging up...")}>
          Sign up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  appTitle: {
    textAlign: "center",
  },
  iconoir: {
    height: 25,
    width: 25,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});

export { Login };
