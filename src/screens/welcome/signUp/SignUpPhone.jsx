import { TextInputHookForm } from "../../../components/TextInputHookForm";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { LoginFooter } from "../../../components/LoginFooter";
import { SmartphoneDevice } from "iconoir-react-native";
import { catHotAPI } from "../../../services/catHotAPI";
import { Button, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";

function SignUpPhone({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onPressSignUp = async data => {
    console.log(data);
    const response = await catHotAPI.createUser(data);
    console.log("response", response);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "Phone number is required",
          }}
          label="Phone number"
          control={control}
          controllerName="phoneNumber"
          left={
            <TextInput.Icon name={props => <SmartphoneDevice {...props} {...styles.iconoir} />} />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          Sign Up
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

export { SignUpPhone };
