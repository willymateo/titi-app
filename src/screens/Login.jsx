import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { LoginFooter } from "../components/LoginFooter";
import { StyleSheet, View } from "react-native";

function Login({ navigation }) {
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
      <TextInput label="Username" left={<User {...styles.iconoir} color="#FF0000" />} />
      <TextInput
        label="Password"
        secureTextEntry
        left={<KeyAltBack {...styles.iconoir} color="#FF0000" />}
        right={<EyeEmpty {...styles.iconoir} color="#FF0000" />}
      />
      <Button mode="contained" uppercase={false} onPress={() => console.log("Loging in...")}>
        Log in
      </Button>
      <LoginFooter
        onPressSignUp={() => navigation.navigate("SignUp")}
        onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  appTitle: {
    textAlign: "center",
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Login };
