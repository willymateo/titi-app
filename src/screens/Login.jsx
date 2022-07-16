import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { EyeClose, EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { TextInputHookForm } from "../components/TextInputHookForm";
import { Button, Text, TextInput } from "react-native-paper";
import { LoginFooter } from "../components/LoginFooter";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit } = useForm();
  const [fontsLoaded] = useFonts({
    Pacifico400Regular,
  });
  const onPressLogin = data => {
    console.log(data);
  };

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

      <TextInputHookForm
        rules={{
          required: "Username is required",
        }}
        label="Username"
        control={control}
        controllerName="username"
        left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
      />
      <TextInputHookForm
        rules={{
          required: "Password is required",
        }}
        secureTextEntry={isPasswordHidden}
        label="Password"
        control={control}
        controllerName="password"
        left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
        right={
          <TextInput.Icon
            name={props => {
              return isPasswordHidden ? (
                <EyeEmpty {...props} {...styles.iconoir} />
              ) : (
                <EyeClose {...props} {...styles.iconoir} />
              );
            }}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        }
      />

      <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressLogin)}>
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
    fontSize: 60,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Login };
