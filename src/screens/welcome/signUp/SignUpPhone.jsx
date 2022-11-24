import { resetSignUpForm, setSignUpForm } from "../../../redux/states/signUpForm";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { MMKV_USER_TOKEN, storage } from "../../../share/app.config";
import { setUserSession } from "../../../redux/states/userSession";
import { LoginFooter } from "../../../components/LoginFooter";
import { SmartphoneDevice } from "iconoir-react-native";
import appAPI from "../../../services/app/api";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";

function SignUpPhone({ navigation }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [errorDialog, setErrorDialog] = useState({
    isVisible: false,
    title: "Error",
    content: "",
  });

  const onPressSignUp = async ({ phoneNumber }) => {
    try {
      dispatch(setSignUpForm({ phone: { phoneNumber } }));
      const { token, error } = await appAPI.createUser();
      if (error) {
        setErrorDialog({ ...errorDialog, isVisible: true, content: error });
        return;
      }
      storage.set(MMKV_USER_TOKEN, token);
      dispatch(resetSignUpForm());
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

        <TextInputHF
          style={styles.inputText}
          rules={{
            required: t("components.inputHookForm.phoneNumberRequired"),
          }}
          label={t("components.inputHookForm.phoneNumber")}
          control={control}
          controllerName="phoneNumber"
          left={
            <TextInput.Icon name={props => <SmartphoneDevice {...props} {...styles.iconoir} />} />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(onPressSignUp)}>
          {t("screens.signUp.createAccount")}
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
