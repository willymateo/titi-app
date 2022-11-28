import { resetSignUpForm, setSignUpForm } from "../../../redux/states/signUpForm";
import { TextInputHF } from "../../../components/hookForm/TextInputHF";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { MMKV_USER_TOKEN, storage } from "../../../config/app.config";
import { setUserSession } from "../../../redux/states/userSession";
import { LoadingDialog } from "../../../components/LoadingDialog";
import { useErrorDialog } from "../../../hooks/useErrorDialog";
import { ErrorDialog } from "../../../components/ErrorDialog";
import { LoginFooter } from "../../../components/LoginFooter";
import { SmartphoneDevice } from "iconoir-react-native";
import { useLoading } from "../../../hooks/useLoading";
import { Button, TextInput } from "react-native-paper";
import * as appAPI from "../../../services/app/users";
import { sharedStyles } from "../../../shared/styles";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUpPhone({ navigation }) {
  const { loading, startLoading, stopLoading } = useLoading();
  const { error, showError, hideError } = useErrorDialog();
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePressSignUp = async ({ phoneNumber }) => {
    try {
      startLoading();
      dispatch(setSignUpForm({ phone: { phoneNumber } }));
      const { token, error: requestError } = await appAPI.createUser();

      if (requestError) {
        showError({ error: requestError });
        stopLoading();
        return;
      }

      storage.set(MMKV_USER_TOKEN, token);
      dispatch(resetSignUpForm());
      dispatch(setUserSession({ token }));
      stopLoading();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ ...styles.container }}>
        <TextInputHF
          style={styles.inputText}
          rules={{
            required: t("components.inputHookForm.phoneNumberRequired"),
          }}
          label={t("components.inputHookForm.phoneNumber")}
          control={control}
          controllerName="phoneNumber"
          left={
            <TextInput.Icon
              name={props => <SmartphoneDevice {...props} {...sharedStyles.iconoirM} />}
            />
          }
        />

        <Button mode="contained" uppercase={false} onPress={handleSubmit(handlePressSignUp)}>
          {t("screens.signUp.createAccount")}
        </Button>
        <LoginFooter
          onPressLogin={() => navigation.navigate("Login")}
          onPressAccountRecovery={() => navigation.navigate("AccountRecovery")}
        />

        <LoadingDialog isVisible={loading} />
        <ErrorDialog isVisible={error} onDismiss={hideError} content={error} />
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
});

export { SignUpPhone };
