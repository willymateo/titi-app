import { useFonts, Pacifico_400Regular as Pacifico400Regular } from "@expo-google-fonts/pacifico";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { EyeClose, EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { TextInputHF } from "../../components/hookForm/TextInputHF";
import { setUserSession } from "../../redux/states/userSession";
import { Button, Text, TextInput } from "react-native-paper";
import { LoginFooter } from "../../components/LoginFooter";
import catHotAPI from "../../services/catHotAPI/api";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Pacifico400Regular,
  });
  const onPressLogin = async data => {
    try {
      const { token, error } = await catHotAPI.login(data);
      if (error) {
        console.log("Show modal of error message", error);
        return;
      }
      dispatch(setUserSession({ token }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <Text
          style={
            fontsLoaded
              ? { ...styles.appTitle, fontFamily: "Pacifico400Regular" }
              : { ...styles.appTitle }
          }>
          CatHot
        </Text>
        <View>
          <TextInputHF
            style={styles.inputText}
            rules={{
              required: "Username is required",
            }}
            label="Username"
            control={control}
            controllerName="username"
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            style={styles.inputText}
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
                    <EyeClose {...props} {...styles.iconoir} />
                  ) : (
                    <EyeEmpty {...props} {...styles.iconoir} />
                  );
                }}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            }
          />
        </View>

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressLogin)}>
          Log in
        </Button>
        <LoginFooter
          onPressSignUp={() => navigation.navigate("SignUp")}
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputText: {
    marginVertical: 5,
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
