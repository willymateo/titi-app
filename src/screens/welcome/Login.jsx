import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { EyeClose, EyeEmpty, KeyAltBack, User } from "iconoir-react-native";
import { TextInputHF } from "../../components/hookForm/TextInputHF";
import { MMKV_USER_TOKEN, storage } from "../../share/app.config";
import { setUserSession } from "../../redux/states/userSession";
import { LoginFooter } from "../../components/LoginFooter";
import appAPI from "../../services/app/api";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Constants from "expo-constants";
import { useState } from "react";

import "../../../assets/fonts/RedHatMono-VariableFont_wght.ttf";

function Login({ navigation }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errorDialog, setErrorDialog] = useState({
    isVisible: false,
    title: "Error",
    content: "",
  });
  const onPressLogin = async data => {
    try {
      const { token, error } = await appAPI.login(data);
      if (error) {
        setErrorDialog({ ...errorDialog, isVisible: true, content: error });
        return;
      }
      storage.set(MMKV_USER_TOKEN, token);
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
        <Portal>
          <Dialog
            visible={errorDialog.isVisible}
            onDismiss={() => setErrorDialog({ ...errorDialog, isVisible: false })}>
            {/* <Dialog.Icon icon={props => <EmojiBlinkRight {...props} {...styles.iconoir} />} />*/}
            <Dialog.Title>{errorDialog.title}</Dialog.Title>
            <Dialog.Content>
              <Text>{errorDialog.content}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setErrorDialog({ ...errorDialog, isVisible: false })}>
                Ok
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Text style={styles.appTitle}>{Constants.manifest.extra.APP_NAME}</Text>
        <View>
          <TextInputHF
            style={styles.inputText}
            rules={{
              required: t("components.inputHookForm.usernameRequired"),
            }}
            label={t("components.inputHookForm.username")}
            control={control}
            controllerName="username"
            left={<TextInput.Icon name={props => <User {...props} {...styles.iconoir} />} />}
          />
          <TextInputHF
            style={styles.inputText}
            rules={{
              required: t("components.inputHookForm.passwordRequired"),
            }}
            secureTextEntry={isPasswordHidden}
            label={t("components.inputHookForm.password")}
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
          {t("screens.welcome.login")}
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
    fontFamily: "",
    textAlign: "center",
    fontSize: 60,
  },
  iconoir: {
    height: 25,
    width: 25,
  },
});

export { Login };
