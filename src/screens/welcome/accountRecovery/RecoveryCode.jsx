import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { TextInputHookForm } from "../../../components/TextInputHookForm";
import { LoginFooter } from "../../../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { PasswordCursor } from "iconoir-react-native";
import { useForm } from "react-hook-form";

function RecoveryCode({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onPressSendRecovery = data => {
    console.log(data);
    navigation.navigate("ResetPassword");
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "Recovery code is required",
          }}
          label="Recovery code"
          control={control}
          controllerName="recoveryCode"
          placeholder="Enter the recovery code"
          left={
            <TextInput.Icon name={props => <PasswordCursor {...props} {...styles.iconoir} />} />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSendRecovery)}>
          Verify recovery code
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

export { RecoveryCode };
