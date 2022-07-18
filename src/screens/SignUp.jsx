import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputHookForm } from "../components/TextInputHookForm";
import { LoginFooter } from "../components/LoginFooter";
import { Button, TextInput } from "react-native-paper";
import { catHotAPI } from "../services/catHotAPI";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../config";
import { useState } from "react";
import {
  Mail,
  User,
  EyeClose,
  EyeEmpty,
  KeyAltBack,
  PeopleRounded,
  SmartphoneDevice,
} from "iconoir-react-native";

function SignUp({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit, watch } = useForm();
  const password = watch("password");
  const onPressSignUp = async data => {
    console.log(data);
    const response = await catHotAPI.createUser(data);
    console.log("response", response);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View>
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "First names are required",
          }}
          label="First names"
          control={control}
          controllerName="firstNames"
          left={<TextInput.Icon name={props => <PeopleRounded {...props} {...styles.iconoir} />} />}
        />
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "Last names are required",
          }}
          label="Last names"
          control={control}
          controllerName="lastNames"
          left={<TextInput.Icon name={props => <PeopleRounded {...props} {...styles.iconoir} />} />}
        />
        <TextInputHookForm
          style={styles.inputText}
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
        <TextInputHookForm
          style={styles.inputText}
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is invalid",
            },
          }}
          label="Email"
          control={control}
          controllerName="email"
          left={<TextInput.Icon name={props => <Mail {...props} {...styles.iconoir} />} />}
        />
        <TextInputHookForm
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
                  <EyeEmpty {...props} {...styles.iconoir} />
                ) : (
                  <EyeClose {...props} {...styles.iconoir} />
                );
              }}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            />
          }
        />
        <TextInputHookForm
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
          Sign Up
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
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

export { SignUp };
