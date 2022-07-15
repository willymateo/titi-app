import { TextInputHookForm } from "../components/TextInputHookForm";
import { LoginFooter } from "../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Mail } from "iconoir-react-native";
import { useForm } from "react-hook-form";

function AccountRecovery({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onPressSendRecovery = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TextInputHookForm
        rules={{
          required: "Enter the email of the account you wanna recover",
        }}
        label="Email"
        control={control}
        controllerName="email"
        placeholder="Enter your account email"
        left={<TextInput.Icon name={props => <Mail {...props} {...styles.iconoir} />} />}
      />

      <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSendRecovery)}>
        Send recovery email
      </Button>
      <LoginFooter
        onPressLogin={() => navigation.popToTop()}
        onPressSignUp={() => navigation.navigate("SignUp")}
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
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { AccountRecovery };
