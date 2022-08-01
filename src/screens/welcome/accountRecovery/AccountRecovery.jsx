import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHookForm } from "../../../components/TextInputHookForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { EMAIL_REGEX } from "../../../share/app.config";
import { Button, TextInput } from "react-native-paper";
import { Mail } from "iconoir-react-native";
import { useForm } from "react-hook-form";

function AccountRecovery({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onPressSendRecovery = data => {
    console.log(data);
    navigation.navigate("RecoveryCode");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "Enter the email of the account you wanna recover",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is invalid",
            },
          }}
          label="Email"
          control={control}
          controllerName="email"
          placeholder="Enter your account email"
          left={<TextInput.Icon name={props => <Mail {...props} {...styles.iconoir} />} />}
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSendRecovery)}>
          Send recovery code
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
          onPressSignUp={() => navigation.navigate("SignUp")}
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
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { AccountRecovery };
