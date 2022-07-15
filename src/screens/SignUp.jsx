import { TextInputHookForm } from "../components/TextInputHookForm";
import { EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { LoginFooter } from "../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";

function SignUp({ navigation }) {
  const { control, handleSubmit } = useForm();
  const onPressSignUp = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <TextInputHookForm
        rules={{
          required: "Username is required",
          minLength: {
            value: 5,
            message: "Username should be minimum 5 characters long",
          },
          maxLength: {
            value: 30,
            message: "Username should be maximum 30 characters long",
          },
          pattern: {
            value: /^[a-z0-9_\.]*[a-z]+[a-z0-9_\.]*$/i,
            message: `Username should be in lowercase.
The only allowed special characters are '_' and '.'`,
          },
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
        secureTextEntry
        label="Password"
        control={control}
        controllerName="password"
        left={<TextInput.Icon name={props => <KeyAltBack {...props} {...styles.iconoir} />} />}
        right={<TextInput.Icon name={props => <EyeEmpty {...props} {...styles.iconoir} />} />}
      />

      <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
        Sign Up
      </Button>
      <LoginFooter
        onPressLogin={() => navigation.popToTop()}
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
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { SignUp };
