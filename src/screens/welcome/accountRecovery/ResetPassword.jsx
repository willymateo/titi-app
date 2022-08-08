import { KeyAlt, EyeClose, EyeEmpty, KeyAltBack } from "iconoir-react-native";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { LoginFooter } from "../../../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ResetPassword({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");
  const onPressSignUp = async data => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: "Password is required",
          }}
          secureTextEntry={isPasswordHidden}
          label="Password"
          control={control}
          controllerName="password"
          left={<TextInput.Icon name={props => <KeyAlt {...props} {...styles.iconoir} />} />}
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
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: "Password is required",
            validate: value => value === password || "Password do not match",
          }}
          secureTextEntry
          label="Repeat password"
          control={control}
          controllerName="repeatPassword"
          left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          Reset password
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
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
    flexGrow: 1,
    justifyContent: "center",
  },
  inputText: {
    marginVertical: 5,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { ResetPassword };
